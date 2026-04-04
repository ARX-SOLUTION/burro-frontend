
**Design System & MCP Integration Guide**

This document describes the repository's design system, component conventions, asset handling and recommended Model Context Protocol (MCP) workflow for integrating Figma designs into the codebase.

**Usage**: Keep this file in the repository root as a living reference for engineers and designers working with Figma → code iterations.

**Design System Structure**

- **Token Definitions**: See `src/styles/theme.css` for the canonical design tokens (colors, radii, typography scales, shadows, animation values).
  - File: [src/styles/theme.css](src/styles/theme.css)
  - Format: CSS custom properties (CSS variables) inside an `@theme` block. Tokens are named with a consistent prefix, e.g. `--color-teal-500`, `--text-lg`, `--radius-lg`.
  - Example token extract:

```css
/* from src/styles/theme.css */
--color-teal-500: rgb(21 183 158);
--text-lg: calc(var(--spacing) * 4.5);
--radius-lg: 0.5rem;
```

  - Transform system: Tokens are native CSS variables consumed directly by Tailwind utilities and by component styles — there is no separate JS token transform pipeline in this repo. Use `theme.css` as the source of truth and prefer referencing variables rather than hard-coded hex values.

- **Typography**: See [src/styles/typography.css](src/styles/typography.css) for prose rules and typography mappings to the token scale.

**Component Library**

- **Location**: Components live under `src/components`. There are two main areas:
  - Primitives & base components: [src/components/base](src/components/base)
  - Application / composed components: [src/components/application](src/components/application)

- **Button example**: primary patterns and theming logic are in [src/components/base/buttons/button.tsx](src/components/base/buttons/button.tsx). Buttons are configurable by `size` and `color` variants and consume token-driven classes.

Example usage:

```tsx
import { Button } from '@/components/base/buttons/button';

<Button color="primary" size="lg" onClick={() => navigate('/arab-tili')}>Boshlash</Button>
```

- **Architecture / patterns**:
  - Component files export named components (and default exports in page wrappers). Small, focused primitives in `base/` (Button, Input, Select, etc.).
  - Larger UI modules and pages are in `src/modules/*` and `src/pages/*` respectively.
  - Components use utility classes (Tailwind) combined with CSS variables from `theme.css`.

- **Docs / Storybook**: The repository does not include a Storybook instance by default. Prefer adding Storybook stories in `src/components/*` if you need visual docs for design handoff.

**Frameworks & Libraries**

- **UI framework**: React + TypeScript (codebase uses import aliases like `@/` → `src/`).
- **Styling**: Tailwind CSS utilities (project imports `tailwindcss` in [src/styles/globals.css](src/styles/globals.css)) combined with CSS variables in `theme.css`.
- **Routing**: `react-router-dom` with lazy-loaded routes under [src/routes/public.tsx](src/routes/public.tsx).
- **Build system**: Vite as bundler (see `vite.config.ts`) and TypeScript project reference (`tsconfig.*`).
- **Testing / E2E**: Playwright is used for E2E tests (`playwright.config.ts`, `tests/e2e.spec.ts`) and a legacy script at `scripts/run-playwright.mjs`.

**Asset Management**

- **Where assets live**: static public assets live in `/public`. Component-level images and small icons are often stored under `src/components/foundations/*` or imported dynamically from Figma.
  - Example Figma-derived usage: `src/modules/arabtilibot/ui/ArabTiliBotLessons.tsx` contains Figma asset URLs as constants that are consumed at runtime.
  - Script that captures screenshots or asserts visuals: [scripts/run-playwright.mjs](scripts/run-playwright.mjs)

- **Optimization**:
  - Vite build performs minification and bundling; large chunk warnings appear in builds (consider code-splitting with dynamic `import()` or manualChunks when needed).
  - Images in `public/` are served as-is; prefer webp/optimized formats for large assets.

- **CDN**: No repo-level CDN config. For production, deploy artifacts to a CDN (Netlify, Cloudflare, S3 + CloudFront) as appropriate.

**Icon System**

- **Where icons live**: `src/components/foundations/logo`, `src/components/foundations/featured-icon`, `src/components/foundations/social-icons`, `src/components/foundations/payment-icons`.
  - Example files: [src/components/foundations/logo/untitledui-logo.tsx](src/components/foundations/logo/untitledui-logo.tsx)

- **Usage**:
  - Icons are React components that render SVG. Import them as components and pass className for sizing and color.
  - The `Button` component accepts icon components as props (`iconLeading` / `iconTrailing`) and uses data attributes to style them.

- **Naming convention**: Icons are grouped by purpose (logo, social, payment, featured) and file names are kebab/slug-style within their folders.

**Styling Approach**

- **Methodology**: Utility-first via Tailwind + global CSS variables.
  - Global Tailwind config is imported in [src/styles/globals.css](src/styles/globals.css).
  - Theme tokens are defined in [src/styles/theme.css](src/styles/theme.css) and referenced by components and typography rules.

- **Global styles**: `src/styles/globals.css` imports `theme.css` and `typography.css`, sets base font family and accessibility helpers.

- **Responsive**: Tailwind responsive utilities are used across components. Breakpoints and container widths are defined as tokens in `theme.css` (e.g. `--breakpoint-xs`, `--max-width-container`).

**Project Structure**

- Top-level layout (short):
  - `src/components` — primitives & foundations
  - `src/modules` — feature modules (ArabTiliBot UI lives here)
  - `src/pages` — page wrappers (used in routes)
  - `src/routes` — route definitions and lazy-loading
  - `src/styles` — `theme.css`, `globals.css`, `typography.css`

- Feature organization: feature folders under `src/modules/<feature>/` contain UI, services and types that belong together (e.g. `src/modules/arabtilibot/ui/*`). This keeps Figma-to-code mappings modular and composable.

**MCP / Figma Integration Rules (recommended)**

- **One source of truth**: keep `src/styles/theme.css` as token source of truth. When mapping Figma tokens via MCP, generate output that updates `theme.css` or a parallel token file that is reviewed and checked into the repo.

- **Design → Code workflow** (recommended):
  1. Designer tags Figma frames with MCP-friendly metadata (token names, component names).
 2. Use Figma MCP `get_design_context` for the target node to extract: screenshot, tokens, component mappings, and recommended React+Tailwind snippets.
 3. Map Figma tokens → CSS variables. Generate a small patch to `src/styles/theme.css` with new token values (open PR for review).
 4. If Code Connect mappings exist, reuse components in `src/components/*` and prefer mapping to existing primitive APIs (e.g., `Button`, `Card`, `Avatar`).
 5. For new screens, create a new module under `src/modules/<feature>/ui/` and a page wrapper under `src/pages/` and wire the route in `src/routes/public.tsx`.

- **Naming conventions**:
  - Figma component name → React component: PascalCase. Folders use kebab-case feature names (e.g., `arabtilibot` → `src/modules/arabtilibot`).
  - Token names should be stable and semantic (e.g. `--color-teal-500`, `--radius-lg`, `--text-lg`). Avoid ephemeral names like `--primary-temp`.

- **Code Connect**: If Figma contains Code Connect mappings, prefer reusing mapped components rather than regenerating new ones.

- **Accessibility**: Ensure interactive elements have accessible labels and keyboard support. When generating buttons from Figma, set `aria-label` and use the existing `Button` API (`iconLeading` / `iconTrailing`) rather than raw divs.

**Examples & Key Patterns**

- Button pattern (component): [src/components/base/buttons/button.tsx](src/components/base/buttons/button.tsx)

```tsx
<Button
  color="primary"
  size="md"
  iconLeading={<PlayIcon />}
  onClick={() => navigate('/arab-tili/lesson/sa/play')}
>
  Boshlash
</Button>
```

- Token reference (consuming a color and radius from `theme.css` in a CSS-in-TS or inline style):

```tsx
const style = { backgroundColor: 'var(--color-teal-500)', borderRadius: 'var(--radius-lg)' };
```

- Routing pattern: pages are lazy-loaded and route entries live in [src/routes/public.tsx](src/routes/public.tsx). Add a new page by creating `src/pages/MyPage.tsx` and adding a lazy import in routes.

**Practical Notes & Gotchas**

- The project uses Tailwind utilities heavily; prefer composing utility classes plus token-driven inline CSS only where necessary.
- Build warnings may show circular re-export or large chunk size. Circular re-exports should be resolved by importing modules directly where necessary. Large chunks can be split using dynamic `import()`.
- For E2E stability: the preview server may bind to IPv6 (`::1`) or IPv4 (`127.0.0.1`). Use an explicit host when running preview in CI (`pnpm preview --port 5173 --host 127.0.0.1`) and set `BASE_URL` for Playwright tests.

**Where to change things (file links)**

- Tokens: [src/styles/theme.css](src/styles/theme.css)
- Global imports: [src/styles/globals.css](src/styles/globals.css)
- Typography rules: [src/styles/typography.css](src/styles/typography.css)
- Base Button: [src/components/base/buttons/button.tsx](src/components/base/buttons/button.tsx)
- ArabTiliBot lessons: [src/modules/arabtilibot/ui/ArabTiliBotLessons.tsx](src/modules/arabtilibot/ui/ArabTiliBotLessons.tsx)
- Lesson play page (example): [src/pages/ArabTiliBotLessonPlayPage.tsx](src/pages/ArabTiliBotLessonPlayPage.tsx)
- Routes: [src/routes/public.tsx](src/routes/public.tsx)
- Playwright legacy script: [scripts/run-playwright.mjs](src/run-playwright.mjs)

---

If you want, I can:
- Generate a PR that syncs Figma token values into `src/styles/theme.css` for a selected frame.
- Add Storybook stories for the new lesson play page components.
- Produce a small MCP script that calls Figma `get_design_context` and emits a token patch to `theme.css`.

Pick one and I'll implement it next.
# Claude Code Project Guide

## Overview

Production-ready React template with authentication, protected routes, and modular architecture.

**Tech Stack:** React 19, Vite 7, TypeScript 5, TanStack Query, React Router 7, React Hook Form + Zod, Tailwind CSS 4, Untitled UI React

## Commands

```bash
pnpm dev              # Start development server (localhost:5173)
pnpm build            # Build for production
pnpm lint             # Run ESLint with auto-fix
pnpm type-check       # TypeScript type checking
pnpm generate:module  # Generate a new CRUD module
```

## Project Structure

```
src/
├── components/
│   ├── application/      # DataTable, ErrorBoundary, Modals, Navigation
│   ├── base/_rhf/        # React Hook Form adapted components
│   └── guards/           # AuthGuard, GuestGuard, RoleGuard, EmailVerifiedGuard
├── contexts/             # React contexts (auth-context)
├── hooks/                # Custom hooks (use-auth, use-breakpoint)
├── layouts/              # DashboardLayout, SettingsLayout, AuthLayout
├── libs/
│   ├── validators/       # Zod validation schemas
│   └── env.ts            # Environment configuration
├── modules/              # Feature modules (auth, users, common)
├── pages/                # Page components
├── routes/               # Route configuration
└── services/             # Axios instances
```

## Module Structure

Each module follows this pattern:

```
modules/[module-name]/
├── api/[module]API.ts           # API endpoint functions
├── constants/query-keys.ts      # Query key factory
├── services/use[Action].ts      # TanStack Query hooks
├── types/[TypeName].ts          # Types (PascalCase files)
├── ui/                          # UI components
│   ├── [Module]Table.tsx
│   ├── Create[Entity]Modal.tsx
│   ├── Edit[Entity]Modal.tsx
│   └── Delete[Entity]Dialog.tsx
└── index.ts                     # Public exports
```

## Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Page components | PascalCase + Page | `UsersPage.tsx` |
| Module UI | PascalCase | `UsersTable.tsx`, `CreateUserModal.tsx` |
| Type files | PascalCase | `User.ts`, `CreateUserRequest.ts` |
| Hooks | camelCase + use | `useUsers.ts`, `useCreateUser.ts` |
| API files | camelCase + API | `usersAPI.ts` |
| Other files | kebab-case | `query-keys.ts` |

## Import Order (Enforced by ESLint)

```typescript
// 1. React and external libraries
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

// 2. Internal modules (@/modules/*)
import { useUsers } from '@/modules/users';

// 3. Components (@/components/*)
import { Button } from '@/components/base/buttons/button';

// 4. Other internal imports (@/*)
import { usePageMetadata } from '@/libs/usePageMetadata';

// 5. Relative imports (../ and ./)
import type { Post } from '../types';
```

## Key Patterns

### Route Guards

```typescript
<AuthGuard>           {/* Requires authentication */}
<GuestGuard>          {/* Only for non-authenticated users */}
<EmailVerifiedGuard>  {/* Requires verified email */}
<RoleGuard minimumRole={Role.Admin}> {/* Role-based access */}
```

### Page Component Pattern

```typescript
export const EntityPage = () => {
  usePageMetadata({ title: 'Entities' });

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editing, setEditing] = useState<Entity | null>(null);
  const [deleting, setDeleting] = useState<Entity | null>(null);

  return (
    <PageWrapper>
      <PageHeader>...</PageHeader>
      <PageContent>
        <QueryErrorBoundary>
          <EntityTable onEdit={setEditing} onDelete={setDeleting} />
        </QueryErrorBoundary>
        <CreateEntityModal isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)} />
        <EditEntityModal entity={editing} isOpen={!!editing} onClose={() => setEditing(null)} />
        <DeleteEntityDialog entity={deleting} isOpen={!!deleting} onClose={() => setDeleting(null)} />
      </PageContent>
    </PageWrapper>
  );
};
```

### Common Module Factories

```typescript
// CRUD API factory
const api = createCrudAPI<Entity, CreateDTO, UpdateDTO, Params>({
  axios: axiosInstance,
  endpoint: '/entities',
});

// Query keys factory
const keys = createQueryKeys<Params>('entities');

// Table filters hook
const { filters, setFilter, setPage } = useTableFilters<Filters>({
  defaults: { page: 1, limit: 10, search: '' },
  resetPageOn: ['search'],
});
```

### Form with Validation

```typescript
const { control, handleSubmit } = useForm<FormData>({
  resolver: zodResolver(schema),
  defaultValues: { title: '' },
});

<RHFInput name="title" control={control} label="Title" />
```

## Do NOT

- Use axios directly in components (use module API layer)
- Define query keys inline (use query key factory)
- Create files outside module structure
- Mix API calls with UI logic (use service hooks)
- Hardcode role strings (use `Role` enum)
- Skip page metadata (`usePageMetadata`)
- Skip error boundaries for data fetching (`QueryErrorBoundary`)
- Write comments in code - Code should be self-documenting through clear naming and structure

## Type Conventions

```typescript
// Use `type` for object shapes
type User = { id: string; name: string };

// Use `interface` for component props
interface ButtonProps { children: ReactNode }

// Request/Response suffixes
type CreateUserRequest = { ... };
type UsersResponse = PaginatedResponse<User>;
```

## Module Generator

Generate a complete CRUD module:

```bash
pnpm generate:module product    # Creates products module
pnpm generate:module category   # Handles irregular plurals
```

Generates: types, API, services, UI components, page, route, and sidebar item.

## Environment Variables

Validated with Zod at startup. Add new variables to `src/libs/env.ts` and `.env.example`.

```typescript
import { env } from '@/libs/env';
const apiUrl = env.VITE_API_BASE_URL;
```

## Authentication

- Tokens stored in localStorage via `tokenStorage`
- Auto-refresh on 401 via axios interceptor
- Two axios instances: `axiosInstance` (authenticated), `authAxiosInstance` (auth endpoints)

## Resources

- [Untitled UI React Docs](https://www.untitledui.com/react/docs/introduction)
- [Untitled UI Icons](https://www.untitledui.com/react/resources/icons)
