# Spec: Template UI Layout

## ADDED Requirements

### Requirement: Dokploy Aesthetic Parity

The template details page MUST follow the layout and visual style of the Dokploy dashboard.

#### Scenario: Visual Elements

- Given a loaded template.
- Then the page MUST display:
  - A header with avatar, title, and action links (GitHub, Docs).
  - A "Base64 Configuration" section with a monospace preview.
  - A tabbed code viewer.

### Requirement: Tabbed Configuration Preview

The system MUST allow users to toggle between different configuration files without reloading the page.

#### Scenario: Switching Tabs

- Given both `docker-compose.yml` and `template.toml` are available.
- When the user clicks the "Configuration" tab.
- Then the TOML content MUST be displayed.
- When the user clicks the "Docker Compose" tab.
- Then the Compose content MUST be displayed.

### Requirement: Code Content Integrity

The code viewer MUST display the raw file content precisely as fetched from GitHub.

#### Scenario: Raw Display

- Given a fetched `docker-compose.yml`.
- Then it MUST be rendered inside a scrollable area with a monospace font.
- Then a "Copy" button MUST be available specifically for that file's content.
