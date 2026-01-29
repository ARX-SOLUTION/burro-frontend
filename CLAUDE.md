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
