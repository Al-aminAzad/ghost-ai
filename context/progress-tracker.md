# Progress Tracker

Update this file whenever the current phase, active feature, or implementation state changes.

## Current Phase

- Authentication

## Current Goal

- Wire Clerk into the app: provider, auth pages, redirects, route protection, and user menu.

## Completed

- Feature 01: Design System — shadcn/ui configured (Tailwind v4), lucide-react installed, all UI primitives added (Button, Card, Dialog, Input, Tabs, Textarea, ScrollArea), `lib/utils.ts` with `cn()` created, dark theme enforced via `dark` class on `<html>`.
- Feature 02: Editor Chrome — custom color tokens added to `globals.css` (`--bg-*`, `--text-*`, `--border-*`, `--accent-*`, `--state-*`) and mapped as Tailwind utilities via `@theme inline`; `EditorNavbar` created (`components/editor/editor-navbar.tsx`) with sidebar toggle using `PanelLeftOpen`/`PanelLeftClose`; `ProjectSidebar` created (`components/editor/project-sidebar.tsx`) as a fixed floating overlay that slides in from the left with My Projects/Shared tabs and a New Project button.
- Feature 03: Authentication — `@clerk/ui` installed; `ClerkProvider` wraps root layout with `dark` baseTheme and CSS variable appearance overrides; `proxy.ts` at project root uses `clerkMiddleware` + `createRouteMatcher` to protect all routes except `/sign-in` and `/sign-up`; sign-in and sign-up pages use a minimal two-panel layout (logo/tagline/feature list on left, Clerk form on right; form-only on small screens); `app/page.tsx` redirects authenticated users to `/editor` and unauthenticated users to `/sign-in`; `UserButton` added to the right section of `EditorNavbar`.

## In Progress

- None.

## Next Up

- Add the next planned feature unit here.

## Open Questions

- Add unresolved product or implementation questions here.

## Architecture Decisions

- Add decisions that affect the system design or data model.

## Session Notes

- Add context needed to resume work in the next session.
