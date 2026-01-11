# Design: Shadcn Vue Migration

## Architecture Overview

We are moving from a monolithic UI library (`@nuxt/ui`) to a "headless" component approach with `shadcn-vue`. Components will be generated into `components/ui` and can be customized locally.

## Technical Details

### Dependencies

- **Remove**: `@nuxt/ui`
- **Add/Keep**: `shadcn-vue`, `lucide-vue-next`, `radix-vue`, `@tailwindcss/vite` (if using Tailwind 4), `clsx`, `tailwind-merge`.

### Component Mapping

| Nuxt UI      | Shadcn Vue       |
| ------------ | ---------------- |
| `UButton`    | `Button`         |
| `UInput`     | `Input`          |
| `UCard`      | `Card`           |
| `UFormGroup` | `Label` + Layout |
| `UForm`      | `Form`           |
| `UModal`     | `Dialog`         |
| `UBadge`     | `Badge`          |
| `UAlert`     | `Alert`          |
| `UIcon`      | `Lucide` icons   |

### Styling with Tailwind 4

Since the project uses Tailwind CSS v4, we will:

1. Use the new `@theme` directive in `assets/css/main.css` to define Shadcn custom properties (e.g., `--background`, `--foreground`, `--primary`, etc.).
2. Ensure `shadcn-vue` components use these CSS variables.
3. Use `lucide-vue-next` for icons, replacing `UIcon` (iconify).

### Utilities

- `clsx` and `tailwind-merge` will be used for conditional class management in components.
- Standard Shadcn `cn` utility will be added to `lib/utils.ts` (or `utils/shadcn.ts`).

## Migration Strategy

1. **Infrastructure**: Setup `shadcn-vue` and `tailwind` 4 configuration.
2. **Component Generation**: Initialize and add required components to `app/components/ui`.
3. **Atomic Migration**: Update one page at a time.
4. **Cleanup**: Remove `@nuxt/ui` once no references remain.
