export const GITHUB_RAW_BASE = "https://raw.githubusercontent.com";

export async function fetchGithubFile(
  owner: string,
  repo: string,
  branch: string,
  path: string
): Promise<string> {
  const url = `${GITHUB_RAW_BASE}/${owner}/${repo}/${branch}/${path
    .replace(/^\.\//, "")
    .replace(/^\//, "")}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch ${path}: ${response.statusText}`);
  }

  return await response.text();
}

export async function resolveDefaultBranch(
  owner: string,
  repo: string
): Promise<string | null> {
  try {
    const res = await fetch(`https://api.github.com/repos/${owner}/${repo}`);
    if (!res.ok) return null;
    type GhRepo = { default_branch?: unknown };
    const data = (await res.json()) satisfies GhRepo;
    return typeof data.default_branch === "string" ? data.default_branch : null;
  } catch {
    return null;
  }
}

export async function resolveBranchCommit(
  owner: string,
  repo: string,
  branch: string
): Promise<{ sha: string; date: string | null } | null> {
  try {
    const res = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/commits/${branch}`
    );
    if (!res.ok) return null;
    type GhCommit = { sha?: unknown; commit?: { committer?: { date?: unknown } } };
    const data = (await res.json()) satisfies GhCommit;
    if (typeof data.sha !== "string") return null;
    const date =
      typeof data.commit?.committer?.date === "string"
        ? data.commit.committer.date
        : null;
    return { sha: data.sha.slice(0, 7), date };
  } catch {
    return null;
  }
}
