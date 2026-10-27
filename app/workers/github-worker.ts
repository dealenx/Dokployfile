import { fetchGithubFile, resolveDefaultBranch, resolveBranchCommit } from "../utils/github";
import { generateDokployPayload } from "../utils/payload";
import { lintComposeFile } from "../utils/linter";
import { parse as parseYaml } from "yaml";
import { DokployfileSchema, type Dokployfile } from "../utils/schema";

self.onmessage = async (e: MessageEvent) => {
  const { owner, repo, branch: preferredBranch } = e.data as {
    owner: string;
    repo: string;
    branch?: string;
  };

  try {
    // Default branch from GitHub API, fallback main/master
    let branchesToTry: string[];
    if (preferredBranch) {
      branchesToTry = [preferredBranch];
    } else {
      const apiBranch = await resolveDefaultBranch(owner, repo);
      branchesToTry = apiBranch
        ? Array.from(new Set([apiBranch, "main", "master"]))
        : ["main", "master"];
    }

    let branch = branchesToTry[0];
    let dokployfile: Dokployfile | null = null;

    // 1. Try to find Dokployfile.yml on available branches
    for (const b of branchesToTry) {
      try {
        const raw = await fetchGithubFile(owner, repo, b, "Dokployfile.yml");
        const validation = DokployfileSchema.safeParse(parseYaml(raw));
        if (validation.success) {
          dokployfile = validation.data;
          branch = b;
          break;
        }
      } catch {}
    }

    // 2. If no branch had a valid Dokployfile.yml, use first branch that exists
    if (!dokployfile) {
      if (!preferredBranch) {
        for (const b of branchesToTry) {
          try {
            await fetchGithubFile(owner, repo, b, "docker-compose.yml");
            branch = b;
            break;
          } catch {}
        }
      }

      dokployfile = {
        version: "1",
        meta: {
          slug: repo,
          name: repo,
          version: "latest",
        },
        template: {
          compose: "docker-compose.yml",
          config: "template.toml",
        },
      };
    }

    const [commit, compose, configRaw] = await Promise.all([
      resolveBranchCommit(owner, repo, branch),
      fetchGithubFile(owner, repo, branch, dokployfile.template.compose),
      fetchGithubFile(owner, repo, branch, dokployfile.template.config).catch(
        () => ""
      ),
    ]);

    const lintResults = lintComposeFile(compose);
    const logoPath = dokployfile.meta.logo;

    if (logoPath && !logoPath.startsWith("http")) {
      try {
        await fetchGithubFile(owner, repo, branch, logoPath);
      } catch {
        lintResults.push({
          level: "error",
          message: `Logo file not found at path: ${logoPath}`,
        });
      }
    }

    self.postMessage({
      success: true,
      data: {
        dokployfile,
        compose,
        config: configRaw,
        base64: generateDokployPayload(compose, configRaw),
        lintResults,
        branch,
        commit,
      },
    });
  } catch (error) {
    self.postMessage({
      success: false,
      error: error instanceof Error ? error.message : String(error),
    });
  }
};