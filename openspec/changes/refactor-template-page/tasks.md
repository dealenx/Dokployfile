# Tasks: Refactor Template Page

## Phase 1: Logic & Tooling

- [x] **Infrastructure**
  - [x] Install Shadcn components: `tabs`, `scroll-area`.
  - [x] Create unit tests for repository file resolution in `tests/github-worker.test.ts`.
- [x] **Core Logic Fix**
  - [x] Fix the resolution logic in `app/workers/github-worker.ts` to correctly use parsed paths from `Dokployfile.yml`.
  - [x] Ensure metadata like `branch` is properly passed through the state.

## Phase 2: UI Implementation

- [x] **Component Creation**
  - [x] Create a `CodeViewer` component to handle file preview with line numbers and copy functionality. (Preview implemented in page)
- [x] **Page Refactoring**
  - [x] Implement the new layout in `app/pages/[owner]/[repo].vue`.
  - [x] Add Tab switching for Compose and Config.
  - [x] Style the Base64 viewer according to the provided reference.

## Phase 3: Validation

- [x] **Integration Testing**
  - [x] Add an integration test case using `https://github.com/dealenx/camo-rs-service`.
  - [x] Verify that `dokploy/docker-compose.yml` is fetched and displayed correctly.
- [ ] **Visual Verification**
  - [ ] Verify the layout on mobile and desktop.
