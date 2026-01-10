import { fetchGithubFile, resolveBranch } from "../utils/github";
import { generateDokployPayload } from "../utils/payload";
import { lintComposeFile } from "../utils/linter";
import { parse as parseYaml } from "yaml";
import { DokployfileSchema } from "../utils/schema";

self.onmessage = async (e: MessageEvent) => {
  const { owner, repo, branch: preferredBranch } = e.data;

  try {
    const branchesToTry = preferredBranch
      ? [preferredBranch]
      : ["main", "master"];
    let branch = branchesToTry[0];
    let dokployfileRaw: string | null = null;
    let dokployfile: any = null;

    // 1. Try to find Dokployfile.yml on available branches
    for (const b of branchesToTry) {
      try {
        const raw = await fetchGithubFile(owner, repo, b, "Dokployfile.yml");
        const parsed = parseYaml(raw);
        const validation = DokployfileSchema.safeParse(parsed);
        if (validation.success) {
          dokployfile = validation.data;
          dokployfileRaw = raw;
          branch = b;
          break;
        } else {
          console.warn(
            `Dokployfile.yml validation failed on branch ${b}`,
            validation.error
          );
        }
      } catch (err) {
        // Continue to next branch
      }
    }

    // 2. If no branch had a valid Dokployfile.yml, try to find the correct branch using a known file
    if (!dokployfile) {
      if (!preferredBranch) {
        for (const b of ["main", "master"]) {
          try {
            // Try to fetch compose file directly as a health check for the branch
            await fetchGithubFile(owner, repo, b, "docker-compose.yml");
            branch = b;
            break;
          } catch (err) {}
        }
      }

      // Default configuration
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

    const composePath = dokployfile.template.compose;
    const configPath = dokployfile.template.config;

    const [compose, configRaw] = await Promise.all([
      fetchGithubFile(owner, repo, branch, composePath),
      fetchGithubFile(owner, repo, branch, configPath).catch(() => ""),
    ]);

    const base64 = generateDokployPayload(compose, configRaw);
    const lintResults = lintComposeFile(compose);

    self.postMessage({
      success: true,
      data: {
        dokployfile,
        compose,
        config: configRaw,
        base64,
        lintResults,
        branch,
      },
    });
  } catch (error: any) {
    self.postMessage({
      success: false,
      error: error.message,
    });
  }
};
