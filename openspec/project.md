# Project Context

## Purpose

A browser-based service to generate Dokploy template import payloads from GitHub repositories.

## Tech Stack

- Nuxt 4 (Framework)
- Vue 3 (Composition API)
- TypeScript (Language)
- Shadcn Vue (UI Components)
- Radix Vue (Primitives)
- Tailwind CSS v4 (Styling)
- Lucide Vue Next (Icons)
- Vitest (Testing)
- Zod & Vee-validate (Validation)
- smol-toml / yaml (Data formats)

## Project Conventions

### Code Style

- Use Vue 3 Script Setup with TypeScript.
- Follow Shadcn Vue patterns for UI components.
- Use Tailwind CSS for almost all styling.
- Keep components small and focused in `app/components`.

### Architecture Patterns

- Pages are located in `app/pages`.
- Reusable UI components in `app/components/ui`.
- Business logic in `app/utils` and `app/composables`.
- Heavy processing (like GitHub interactions) moved to Workers in `app/workers` and accessed via composables in `app/composables` (e.g., `useGithubWorker.ts`).

### Testing Strategy

- Use Vitest for unit and integration tests.
- Tests are located in the `tests/` directory.

### Git Workflow

- Use OpenSpec for all feature development.
- Kebab-case for branch and change IDs.

## Domain Context

- **Dokploy**: An open-source alternative to Heroku/Vercel/Coolify.

## Important Constraints

- Must produce valid YAML/JSON according to Dokploy schema.
- Must be performant and responsive.

## External Dependencies

- GitHub API (for fetching templates/repos)
- Dokploy Schema (external reference)
