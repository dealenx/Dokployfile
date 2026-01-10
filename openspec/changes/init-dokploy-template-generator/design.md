# Design: Dokploy Template Generator

## Architecture

The application is a Nuxt 3 project configured as a Single Page Application (SPA) for deployment to GitHub Pages. All processing occurs in the user's browser.

### 1. Data Flow

- User visits `/[owner]/[repo]` (optional `?branch=...`).
- Client-side execution:
  1. Parse the URL to identify `owner`, `repo`, and `branch`.
  2. Offload processing to a **Web Worker**:
     - Fetch `Dokployfile.yml` directly from GitHub using `fetch` on raw content URLs.
     - Parse `Dokployfile.yml` and discover relative paths for `compose` and `config`.
     - Fetch `compose` and `config` files using the same method.
     - Generate JSON `{ compose, config }` and Base64 encode it.
     - Send the final payload back to the main thread.
  3. UI displays the template info and provides a "Copy Base64" button.

### 2. Dokployfile Schema (Zod)

```typescript
const DokployfileSchema = z.object({
  version: z.literal("1"),
  meta: z.object({
    slug: z.string(), // Matches "id" in meta.json
    name: z.string(),
    version: z.string(),
    description: z.string().optional(),
    logo: z.string().optional(), // Path or URL
    tags: z.array(z.string()).optional(),
    links: z.record(z.string().url()).optional(), // Matches meta.json { github: "...", website: "..." }
  }),
  template: z.object({
    compose: z.string().default("docker-compose.yml"),
    config: z.string().default("template.toml"),
    instructions: z.string().optional(),
  }),
});
```

### 3. GitHub Fetching

- URLs: `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${path}`.
- Fallback: If `Dokployfile.yml` is missing, try fetching root `docker-compose.yml` and `template.toml`.
- **Logo Resolution**: If `meta.logo` is a relative path, resolve it to the raw GitHub URL for display.

### 4. Dokploy Best Practices (Validation)

To ensure templates work correctly in Dokploy, the system should check:

- **Ports**: Recommend `- 3000` instead of `- 3000:3000` in `docker-compose.yml`.
- **Naming**: Ensure `container_name` is NOT used in `docker-compose.yml`.
- **Networks**: Recommend removing `networks` or `dokploy-network` definitions.
- **Service Alignment**: Ensure `template.toml` service names match `docker-compose.yml`.

### 4. Caching

- Use browser `sessionStorage` or Nuxt state to cache fetched data within the session.
- No cross-user caching (since there is no server).

### 5. UI Components

- `TemplatePreview`: Displays description, tags, and logo.
- `Base64Display`: Text area with the generated string and copy button.
- `ManualGeneratorForm`: Inputs for `docker-compose.yml` and `template.toml` content.
- `BadgeHelper`: UI to copy the markdown for the static badge (pointing to GitHub Pages URL).

### 6. Manual Generator Logic

- Located at a dedicated route (e.g., `/manual` or `/generate`).
- Takes two text inputs: Compose and Config (TOML).
- Updates the Base64 output in real-time or on form submission.
- Uses the same internal encoding logic as the GitHub-based flow.

## Technical Trade-offs

- **SPA on GitHub Pages**: Simplifies deployment and reduces costs, but prevents server-side features like dynamic SVG generation.
- **CORS Handling**: GitHub raw content URLs (`raw.githubusercontent.com`) support CORS, allowing direct browser fetching.
- **Static Base URL**: The app must be compatible with being hosted on a subpath if necessary (e.g., `user.github.io/repo/`).
