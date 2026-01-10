# Proposal: Init Dokploy Template Generator

## Problem

Dokploy users need a simple way to share and import templates. Currently, this requires manually creating a JSON with `compose` and `config` fields and encoding it to Base64. There is no standard for storing these templates in repositories.

## Solution

Create a service that:

1. Standardizes template metadata via `Dokployfile.yml`, aligned with the official [meta.json](https://github.com/Dokploy/templates/blob/main/meta.json) format.
2. Automatically generates the required Base64 payload from GitHub repositories.
3. Provides a visual badge and a landing page for easy template distribution.
4. Offers a manual generator tool for users to paste their own configurations.
5. Surfaces Dokploy best practices (linting) to users for their templates.

## Scope

- `Dokployfile.yml` parser and Zod schema.
- GitHub file fetcher (client-side).
- Base64 payload generator (browser-based).
- Nuxt-based SPA interface to display and copy the payload.
- Manual generator page (Compose + TOML config → Base64).
- Documentation for static badge usage.

## Out of Scope

- Server-side API or dynamic badge generation.
- Mono-repo support (`app` parameter) in Version 1.
- Editing templates through the UI (read-only for now).
- Persistent database (stateless client-side).

## Impacts

- New project structure: `app/` will house the Nuxt application.
- `openspec/specs/` will be populated with the initial project specifications.
