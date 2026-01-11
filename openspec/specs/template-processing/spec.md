# template-processing Specification

## Purpose
TBD - created by archiving change init-dokploy-template-generator. Update Purpose after archive.
## Requirements
### Requirement: GitHub File Retrieval

The system MUST retrieve files from GitHub using owner/repo/branch context.

#### Scenario: Retrieve from Main Branch

- Given a repo `owner/repo`.
- When fetching files without a branch specified.
- Then it should attempt to fetch from `main`, then `master`.

### Requirement: Background Processing

The system MUST perform all GitHub API calls and data processing within a Web Worker to keep the main UI thread responsive.

#### Scenario: Fetching Data in Worker

- Given a repository URL.
- When the application starts fetching data.
- Then the actual fetch calls should occur inside a Web Worker.

### Requirement: Base64 Payload Generation

The system MUST generate a Base64 encoded JSON containing the compose and config content.

#### Scenario: Successful Generation

- Given `compose` content and `config` content (from TOML).
- When encoded.
- Then the result should be a Base64 string of `{"compose":"...","config":"..."}`.

### Requirement: Caching

Processed template data SHALL be cached in the browser to avoid excessive GitHub requests.

#### Scenario: Cache Hit

- Given a request for `owner/repo/branch` that was processed earlier in the session.
- When requested again.
- Then the cached value from `sessionStorage` or local state should be returned instead of re-fetching from GitHub.

