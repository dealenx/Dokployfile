# dokployfile-schema Specification

## Purpose
TBD - created by archiving change init-dokploy-template-generator. Update Purpose after archive.
## Requirements
### Requirement: Dokployfile Validation

The system MUST validate `Dokployfile.yml` against a defined schema and SHOULD check the associated template files for Dokploy best practices.

#### Scenario: Valid Dokployfile

- Given a YAML file with `version: "1"`, `meta`, and `template`.
- When parsed with the Zod schema.
- Then it should return a valid object.

#### Scenario: Missing Template Files

- Given a `Dokployfile.yml` that points to non-existent `compose` or `config` files.
- When processing the template.
- Then it should throw a clear error message.

#### Scenario: Best Practice Warnings

- Given a `docker-compose.yml` that uses `container_name`.
- When processing the template.
- Then it SHOULD provide recommendations for Dokploy compatibility.

### Requirement: JSON Schema Export

The system SHALL provide a JSON schema for `Dokployfile.yml` to enable editor autocompletion.

#### Scenario: Accessing JSON Schema

- Given the application is running.
- When accessing `/schema.json`.
- Then it should return the JSON schema derived from the Zod model.

