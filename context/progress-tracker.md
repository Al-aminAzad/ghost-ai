# Progress Tracker

Update this file whenever the current phase, active feature, or implementation state changes.

## Current Phase

- Project Dialogs

## Current Goal

- Build the `/editor` home screen and add project dialogs/sidebar actions.

## Completed

- Feature 01: Design System — shadcn/ui configured (Tailwind v4), lucide-react installed, all UI primitives added (Button, Card, Dialog, Input, Tabs, Textarea, ScrollArea), `lib/utils.ts` with `cn()` created, dark theme enforced via `dark` class on `<html>`.
- Feature 02: Editor Chrome — custom color tokens added to `globals.css` (`--bg-*`, `--text-*`, `--border-*`, `--accent-*`, `--state-*`) and mapped as Tailwind utilities via `@theme inline`; `EditorNavbar` created (`components/editor/editor-navbar.tsx`) with sidebar toggle using `PanelLeftOpen`/`PanelLeftClose`; `ProjectSidebar` created (`components/editor/project-sidebar.tsx`) as a fixed floating overlay that slides in from the left with My Projects/Shared tabs and a New Project button.
- Feature 03: Authentication — `@clerk/ui` installed; `ClerkProvider` wraps root layout with `dark` baseTheme and CSS variable appearance overrides; `proxy.ts` at project root uses `clerkMiddleware` + `createRouteMatcher` to protect all routes except `/sign-in` and `/sign-up`; sign-in and sign-up pages use a minimal two-panel layout (logo/tagline/feature list on left, Clerk form on right; form-only on small screens); `app/page.tsx` redirects authenticated users to `/editor` and unauthenticated users to `/sign-in`; `UserButton` added to the right section of `EditorNavbar`.
- Feature 04: Project Dialogs — editor home screen (`app/editor/page.tsx`) shows heading, description, and New Project button; `lib/mock-projects.ts` defines `Project` type and mock data; `hooks/use-project-dialogs.ts` manages dialog/form/loading state with slug derivation; `components/editor/editor-context.tsx` provides `EditorProvider` and `useEditor` hook; `components/editor/project-dialogs.tsx` renders Create (with live slug preview), Rename (prefilled, auto-focus, Enter submits), and Delete (destructive) dialogs; `components/editor/project-sidebar.tsx` updated to show project list with per-item rename/delete actions for owned projects (hidden for shared), mobile backdrop scrim, and New Project button wired to Create dialog; `app/editor/layout.tsx` wraps subtree in `EditorProvider` and renders `ProjectDialogs`.

## In Progress

- None. Feature 04 complete.

## Next Up

- Add the next planned feature unit here.

## Open Questions

- Add unresolved product or implementation questions here.

## Architecture Decisions

- Add decisions that affect the system design or data model.

## Session Notes

- Add context needed to resume work in the next session.
