# Spec: Web Interface

## ADDED Requirements

### Requirement: Template Landing Page

The system SHALL provide a page to display template information and provide the import payload.

#### Scenario: Viewing Template

- Given a valid repo path `/[owner]/[repo]`.
- When the page is loaded.
- Then it should show the template name, description, and a "Copy for Dokploy" button.

### Requirement: Static Badge Support

The system SHALL provide documentation and URLs for static badges that point to the template landing page.

#### Scenario: Copying Badge Markdown

- Given a valid repo path `/[owner]/[repo]`.
- When the page is loaded.
- Then it should provide a markdown snippet using a Shields.io badge that links to the service.

### Requirement: Manual Payload Generator

The system SHALL provide a interface for manually generating a Dokploy import payload without a GitHub repository.

#### Scenario: Manual Input

- Given the manual generator page is open.
- When the user pastes `docker-compose.yml` and `template.toml` content.
- Then the system should display the corresponding Base64 encoded payload.
