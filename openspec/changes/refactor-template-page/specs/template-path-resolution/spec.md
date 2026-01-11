# Spec: Template Path Resolution

## ADDED Requirements

### Requirement: Respect Dokployfile Paths

The system MUST fetch template files from paths specified in `Dokployfile.yml`.

#### Scenario: Custom Subdirectory Paths

- Given a `Dokployfile.yml` with:
  ```yaml
  template:
    compose: "dokploy/docker-compose.yml"
    config: "dokploy/template.toml"
  ```
- When fetching the repository content.
- Then it MUST attempt to fetch `dokploy/docker-compose.yml` and `dokploy/template.toml` instead of root-level files.

#### Scenario: Fallback to Root on Missing Paths

- Given a `Dokployfile.yml` without a `template` section.
- When processing.
- Then it MUST default to `docker-compose.yml` and `template.toml` at the repository root.
