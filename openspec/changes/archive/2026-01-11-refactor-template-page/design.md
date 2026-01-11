# Design: Refactor Template Page

## Architectural Context

### Data Fetching (Logic)

The `github-worker.ts` handles the multi-step process of identifying the branch, fetching `Dokployfile.yml`, extracting metadata/paths, and fetching the actual template files. We need to ensure the schema defaults dont overwrite explicit values when the file IS present but the fields are optional.

### Frontend Display (UI)

The `[owner]/[repo].vue` page currently uses a simple vertical card stack. We will transition to:

- A prominent header section for metadata.
- A central area for the Base64 payload.
- A tabbed code viewer using `radix-vue` (via `shadcn-vue` Tabs).
- Code formatting will be handled via a custom `CodeBlock` component or raw `<pre>` tag with styling.

## Proposed Changes

1. **Worker Refactor**: Explicitly check for `template` presence in `Dokployfile.yml` and use those paths.
2. **Component Library**: Install `shadcn-vue` Tabs and ScrollArea components.
3. **UI Layout**:
   - Header: Avatar (logo) + Title + Version + Action Links.
   - Description & Tags.
   - Base64 section with a monospace textarea/input and copy button.
   - Tabs section:
     - Tab 1: `docker-compose.yml`.
     - Tab 2: `template.toml` (if available).
   - Each tab content should have its own "Copy" button.

## Testing Strategy

- **Logic**: Mock fetch responses for `camo-rs-service`.
- **UI**: Visual verification of tab switching and content rendering.
