# Proposal: Refactor Template Page (Logic & UI)

## Problem

1. **Path Resolution**: The system currently fails to respect custom paths for `docker-compose.yml` and `template.toml` defined in `Dokployfile.yml`. It defaults to the repository root.
2. **UI Realism**: The template details page lacks visual parity with the Dokploy dashboard, specifically the ability to inspect raw configuration files and a more dense, structured layout.

## Solution

1. **Logic**: Correctly parse and use `template.compose` and `template.config` from `Dokployfile.yml` during fetching.
2. **UI**: Redesign the template page to match the Dokploy aesthetic, including a tabbed interface for file previews, improved header with meta-information, and a dedicated Base64 payload viewer.

## Capabilities

### Template Path Resolution

- The system SHOULD use `template.compose` and `template.config` from `Dokployfile.yml` as relative paths.
- The system MUST fall back to root-level files if no valid `Dokployfile.yml` is found.

### Template Visual Display

- The system MUST provide a tabbed interface to switch between "Docker Compose" and "Configuration" (TOML).
- The system MUST display the raw content of these files with syntax highlighting or clear monochromatic formatting.
- The system SHOULD provide a header with the logo, title, description, and tags fetched from metadata.
