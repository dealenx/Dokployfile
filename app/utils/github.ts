export const GITHUB_RAW_BASE = "https://raw.githubusercontent.com";

export async function fetchGithubFile(
  owner: string,
  repo: string,
  branch: string,
  path: string
): Promise<string> {
  const url = `${GITHUB_RAW_BASE}/${owner}/${repo}/${branch}/${path.replace(
    /^\.\//,
    ""
  )}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch ${path}: ${response.statusText}`);
  }

  return await response.text();
}

export async function resolveBranch(
  owner: string,
  repo: string,
  preferredBranch?: string
): Promise<string> {
  if (preferredBranch) return preferredBranch;

  // Try main then master
  try {
    const res = await fetch(
      `${GITHUB_RAW_BASE}/${owner}/${repo}/main/README.md`,
      { method: "HEAD" }
    );
    if (res.ok) return "main";
  } catch {}

  return "master";
}
