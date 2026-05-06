# Progress Tracker

Update this file whenever the current phase, active feature, or implementation state changes.

## Current Phase

- Share Dialog

## Current Goal

- Collaborator invite/remove with Clerk-enriched display and owner-gated UI.

## Completed

- Feature 01: Design System — shadcn/ui configured (Tailwind v4), lucide-react installed, all UI primitives added (Button, Card, Dialog, Input, Tabs, Textarea, ScrollArea), `lib/utils.ts` with `cn()` created, dark theme enforced via `dark` class on `<html>`.
- Feature 02: Editor Chrome — custom color tokens added to `globals.css` (`--bg-*`, `--text-*`, `--border-*`, `--accent-*`, `--state-*`) and mapped as Tailwind utilities via `@theme inline`; `EditorNavbar` created (`components/editor/editor-navbar.tsx`) with sidebar toggle using `PanelLeftOpen`/`PanelLeftClose`; `ProjectSidebar` created (`components/editor/project-sidebar.tsx`) as a fixed floating overlay that slides in from the left with My Projects/Shared tabs and a New Project button.
- Feature 03: Authentication — `@clerk/ui` installed; `ClerkProvider` wraps root layout with `dark` baseTheme and CSS variable appearance overrides; `proxy.ts` at project root uses `clerkMiddleware` + `createRouteMatcher` to protect all routes except `/sign-in` and `/sign-up`; sign-in and sign-up pages use a minimal two-panel layout (logo/tagline/feature list on left, Clerk form on right; form-only on small screens); `app/page.tsx` redirects authenticated users to `/editor` and unauthenticated users to `/sign-in`; `UserButton` added to the right section of `EditorNavbar`.
- Feature 04: Project Dialogs — editor home screen (`app/editor/page.tsx`) shows heading, description, and New Project button; `lib/mock-projects.ts` defines `Project` type and mock data; `hooks/use-project-dialogs.ts` manages dialog/form/loading state with slug derivation; `components/editor/editor-context.tsx` provides `EditorProvider` and `useEditor` hook; `components/editor/project-dialogs.tsx` renders Create (with live slug preview), Rename (prefilled, auto-focus, Enter submits), and Delete (destructive) dialogs; `components/editor/project-sidebar.tsx` updated to show project list with per-item rename/delete actions for owned projects (hidden for shared), mobile backdrop scrim, and New Project button wired to Create dialog; `app/editor/layout.tsx` wraps subtree in `EditorProvider` and renders `ProjectDialogs`.
- Feature 05: Prisma Data Models — `prisma/models/project.prisma` defines `Project` (ownerId, name, description, status enum DRAFT/ARCHIVED, canvasJsonPath, timestamps, indexes on ownerId and createdAt) and `ProjectCollaborator` (cascade-delete relation, email, createdAt, unique on projectId/email, indexes on email and projectId/createdAt); `lib/prisma.ts` exports a cached `PrismaPg`-backed singleton (`globalThis` cache for dev hot reloads, `prisma+postgres://` branch reserved for Accelerate); migration `20260505183833_init` applied; client generated to `app/generated/prisma`; `npm run build` passes.
- Feature 06: Project APIs — `app/api/projects/route.ts` handles `GET` (list owner's projects ordered by createdAt desc) and `POST` (create, defaulting missing name to "Untitled Project"); `app/api/projects/[projectId]/route.ts` handles `PATCH` (rename, owner-only) and `DELETE` (delete, owner-only); all handlers return 401 for unauthenticated requests and 403 for non-owner mutations; `npm run build` passes.
- Feature 09: Share Dialog — `app/api/projects/[projectId]/collaborators/route.ts` handles `GET` (list collaborators enriched via `clerkClient().users.getUserList()` with name and imageUrl, falls back to email-only if no Clerk user found) and `POST` (invite by email, owner-only, upserts to avoid duplicates); `app/api/projects/[projectId]/collaborators/[email]/route.ts` handles `DELETE` (remove collaborator, owner-only, URL-decoded email); `components/editor/share-dialog.tsx` renders a Dialog with owner-gated invite form + collaborator list (avatar/name/email + remove button for owners), copy-link button with `Copied!` feedback, and Loader states throughout; `components/editor/workspace-view.tsx` updated to accept `projectId` and `isOwner` props and wire the Share button; `app/editor/[roomId]/page.tsx` passes both to `WorkspaceView`; `npm run build` passes.
- Feature 08: Editor Workspace Shell — `lib/project-access.ts` provides `getCurrentIdentity()` (Clerk userId + primary email) and `getProjectWithAccess(projectId)` (checks owner or collaborator); `components/editor/access-denied.tsx` renders a centered lock-icon page with a link back to `/editor`; `app/editor/[roomId]/page.tsx` is a server component that redirects unauthenticated users to `/sign-in`, shows `AccessDenied` for missing or unauthorized projects, and renders `WorkspaceView` for valid access; `components/editor/workspace-view.tsx` is a client component with a project-name sub-navbar (share button + AI sidebar toggle), canvas placeholder, and collapsible AI sidebar placeholder; `components/editor/project-sidebar.tsx` highlights the active project using `usePathname()`; `npm run build` passes.
- Feature 07: Wire Editor Home — `lib/projects.ts` provides `getOwnedProjects()` and `getSharedProjects()` server helpers (Prisma + Clerk auth, returns `ProjectSummary` with id/name/ownerId); `app/editor/layout.tsx` is now a server component that fetches both lists and passes them to `components/editor/editor-shell.tsx` (client shell with sidebar toggle state + `EditorProvider`); `hooks/use-project-actions.ts` replaces mock hook with real API calls (create → POST → navigate to `/editor/${id}`, rename → PATCH → refresh, delete → DELETE → redirect if active else refresh), generates slug+suffix room ID preview; `components/editor/editor-context.tsx` updated to accept `ownedProjects`/`sharedProjects` props; `components/editor/project-sidebar.tsx` reads real project lists from context; `components/editor/project-dialogs.tsx` shows room ID (slug-suffix) preview and threads `isLoading` to buttons; `app/editor/page.tsx` is a server component; `components/editor/new-project-button.tsx` is the isolated client button; `npm run build` passes.

## In Progress

- None. Feature 09 complete.

## Next Up

- Add the next planned feature unit here.

## Open Questions

- Add unresolved product or implementation questions here.

## Architecture Decisions

- Add decisions that affect the system design or data model.

## Session Notes

- Add context needed to resume work in the next session.
