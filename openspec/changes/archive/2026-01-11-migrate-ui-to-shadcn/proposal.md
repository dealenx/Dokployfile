# Proposal: Migrate UI from Nuxt UI to Shadcn Vue

## Problem

The project currently uses `@nuxt/ui` for its component library. To align with specific design requirements and leverage the flexibility of `shadcn-vue`, we need to migrate the entire UI layer.

## Proposed Change

Replace `@nuxt/ui` with `shadcn-vue`. This involves:

- Removing `@nuxt/ui` dependency and module configuration.
- Setting up `shadcn-vue` according to the Nuxt installation guide.
- Configuring Tailwind CSS for Shadcn.
- Re-implementing all existing UI components (Buttons, Inputs, Cards, etc.) using Shadcn equivalents.
- Updating all pages (`index.vue`, `generate.vue`, `[owner]/[repo].vue`) to use the new components.

## Impact

- **End-user**: No functional changes, but UI might have visual differences consistent with Shadcn design system.
- **Developer**: Changes the component library and mental model from "pre-built components" to "copied components" (Shadcn pattern).
- **Architecture**: Transitions from a Nuxt module-based UI to a more local, tailwind-based UI system.
