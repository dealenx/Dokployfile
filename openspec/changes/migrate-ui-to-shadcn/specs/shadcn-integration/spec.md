# Spec: Shadcn Integration

## ADDED Requirements

### UI Component Framework

The project MUST use Shadcn Vue as the primary UI component framework.

#### Scenario: Component Usage in Pages

Given a page requiring a button
When the developer uses the `Button` component from `@/components/ui/button`
Then it MUST render with the project's theme and Tailwind styles.

### Component Localization

Components MUST be located in the `app/components/ui` directory.

#### Scenario: Adding New Components

Given the developer needs a new UI element (e.g., Accordion)
When they run `npx shadcn-vue@latest add accordion`
Then the component files SHOULD be generated in `app/components/ui/accordion`.

### Removal of Nuxt UI

The `@nuxt/ui` module MUST NOT be present in the project configuration or dependencies after migration.

#### Scenario: Verification of Removal

Given a completed migration
When I check `package.json` and `nuxt.config.ts`
Then `@nuxt/ui` SHOULD NOT be listed.
