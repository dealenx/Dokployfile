# Tasks: Init Dokploy Template Generator

## Phase 1: Core Logic & Schema

- [ ] Define Zod schema for `Dokployfile.yml`.
- [ ] Create `schema.json` generation utility.
- [ ] Implement `fetchGithubFile` utility with raw URL fallback logic.
- [ ] Implement Base64 payload generator.
- [ ] Implement simple "Best Practices" linter for Compose files (no `container_name`, single port syntax).
- [ ] Write unit tests for parsing, encoding, and linting.
      Panting

## Phase 2: Client-side Logic & Workers

- [ ] Implement browser-based `fetchGithubFile` utility.
- [ ] Create a Web Worker for fetching and processing GitHub data.
- [ ] Implement message passing between Main thread and Web Worker.
- [ ] Implement client-side `sessionStorage` caching (can be in worker or main thread).
- [ ] Setup Nuxt for static site generation (SSG) or SPA mode for GitHub Pages.
- [ ] Add error handling for GitHub rate limits.

## Phase 3: Frontend Interface

- [ ] Create `[owner]/[repo].vue` dynamic route (using hash mode or 404.html trick for GH Pages).
- [ ] Implement `TemplateMetadata` component.
- [ ] Implement `ImportPayload` component (copy to clipboard).
- [ ] Implement `BadgeHelper` component explaining how to use Shields.io badges.
- [ ] Implement manual generator page (`/generate`) with two text areas for Compose and TOML.
- [ ] Add "How to use" instructions on the landing page.

## Phase 4: Documentation & DX

- [ ] Update root `README.md` with usage examples.
- [ ] Add `Dokployfile.yml` template to the repo.
- [ ] Final validation of the flow.
