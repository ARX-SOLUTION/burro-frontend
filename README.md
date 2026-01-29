# Frontend Template

A production-ready React template with authentication, protected routes, and modular architecture.

## Tech Stack

- React 19
- Vite 7
- TypeScript 5
- TanStack Query (React Query)
- React Router DOM 7
- React Hook Form + Zod
- Axios
- Tailwind CSS 4
- ESLint 9 + Prettier
- Untitled UI React

## Getting Started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:5173](http://localhost:5173) with your browser to see the result.

## Scripts

```bash
pnpm dev              # Start development server
pnpm build            # Build for production
pnpm preview          # Preview production build
pnpm lint             # Run ESLint with auto-fix
pnpm lint:check       # Run ESLint without auto-fix (CI)
pnpm format           # Format with Prettier
pnpm format:check     # Check formatting (CI)
pnpm type-check       # TypeScript type checking
pnpm generate:module  # Generate a new CRUD module
```

## Environment Variables

Environment variables are validated at startup using Zod. If required variables are missing or invalid, the app will fail fast with helpful error messages.

Create a `.env.local` file:

```env
VITE_API_BASE_URL=http://localhost:4000/api
```

To add new environment variables:

1. Add to the schema in `src/libs/env.ts`
2. Add to `.env.example`

```typescript
import { env, isDev, isProd } from '@/libs/env';

const apiUrl = env.VITE_API_BASE_URL; // Type-safe, validated
```

## CI/CD

### Git Hooks (Husky)

```bash
pnpm install  # Automatically sets up husky via "prepare" script
```

**Pre-commit:**

- Runs lint-staged (ESLint + Prettier on staged files)
- Fixed files are automatically re-staged
- Runs type-check on entire codebase

**Pre-push:**

- Runs full build to catch build errors before pushing

### GitHub Actions

CI runs on every push/PR to `main`:

- Lint check
- Format check
- Type check
- Build

See `.github/workflows/ci.yml` for configuration.

## Docker

Build and run with Docker Compose:

```bash
docker compose up --build
```

Or build manually:

```bash
docker build -t frontend-template --build-arg VITE_API_BASE_URL=http://localhost:4000/api .
docker run -p 3000:80 frontend-template
```

## Project Structure

```
src/
├── components/
│   ├── application/
│   │   ├── data-table/       # Generic DataTable component
│   │   ├── error-boundary/   # ErrorBoundary, QueryErrorBoundary
│   │   ├── app-navigation/   # Sidebar and header navigation
│   │   └── modals/           # Modal components
│   ├── base/
│   │   ├── _rhf/             # React Hook Form adapted components
│   │   └── [component]/      # Base UI components
│   ├── guards/               # Route guards (AuthGuard, GuestGuard, RoleGuard)
│   └── page-loading.tsx      # Full page loading
├── contexts/                 # React contexts
├── hooks/                    # Custom hooks
├── layouts/                  # Layout components
├── libs/
│   ├── storage/              # Token storage utilities
│   ├── validators/           # Zod validation schemas
│   ├── env.ts                # Environment configuration
│   └── usePageMetadata.ts    # Page title/description hook
├── modules/                  # Feature modules
│   ├── auth/                 # Authentication module
│   ├── users/                # Users CRUD module
│   └── common/               # Shared utilities and types
├── pages/                    # Page components
├── providers/                # App providers
├── routes/                   # Route configuration
├── services/                 # Axios instances
├── styles/                   # Global CSS
└── utils/                    # Utility functions

scripts/
├── generate-module.cjs       # Module generator script
└── templates/                # Generator templates
    ├── module/               # Module file templates
    └── page/                 # Page file templates
```

## Naming Conventions

| Type                 | Convention            | Example                              |
| -------------------- | --------------------- | ------------------------------------ |
| Module UI components | PascalCase            | `SigninForm.tsx`                     |
| Page components      | PascalCase            | `DashboardPage.tsx`                  |
| Module type files    | PascalCase            | `AuthUser.ts`, `SigninRequest.ts`    |
| Other files          | kebab-case            | `use-user-profile.ts`, `auth-api.ts` |
| Component exports    | PascalCase            | `UserProfile`                        |
| Hooks                | camelCase with prefix | `useUserProfile`                     |
| Types                | PascalCase            | `AuthUser`                           |
| Validators           | camelCase             | `signinValidator`                    |

## Route Configuration

Routes are defined using `createBrowserRouter` with object-based configuration in `src/routes/index.tsx`:

```typescript
export const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            { index: true, element: <HomePage /> },
            {
                path: "auth",
                element: <GuestGuard><AuthLayout /></GuestGuard>,
                children: [
                    { path: "login", element: <LoginPage /> },
                    { path: "register", element: <RegisterPage /> },
                ],
            },
            {
                path: "dashboard",
                element: <AuthGuard><EmailVerifiedGuard><DashboardLayout /></EmailVerifiedGuard></AuthGuard>,
                children: [
                    { index: true, element: <DashboardPage /> },
                ],
            },
        ],
    },
]);
```

## Route Guards

### AuthGuard

Protects routes requiring authentication. Redirects to `/auth/login` if not authenticated.

### GuestGuard

For auth pages (login, register). Redirects to `/dashboard` if already authenticated.

### EmailVerifiedGuard

Ensures user has verified email before accessing protected content.

### RoleGuard

Restricts access based on user role hierarchy.

```typescript
import { Role } from "@/modules/auth";

// In route configuration
{
    path: "users",
    element: (
        <RoleGuard minimumRole={Role.Admin} pageLevel>
            <UsersPage />
        </RoleGuard>
    ),
}

// Inline usage
<RoleGuard minimumRole={Role.Admin}>
    <AdminOnlyButton />
</RoleGuard>
```

## Role-based Access Control

The auth module provides a role system with hierarchy:

```typescript
// Role hierarchy (highest to lowest)
enum Role {
    Superadmin = "superadmin",
    Admin = "admin",
    User = "user",
}

// useRole hook for checking permissions
import { useRole, Role } from "@/modules/auth";

const { role, isAtLeast, isExactly } = useRole();

isAtLeast(Role.Admin);     // true if Admin or Superadmin
isExactly(Role.User);      // true only if User

// Role labels and badge colors for UI
import { ROLE_LABELS, ROLE_BADGE_COLORS } from "@/modules/auth";

<Badge color={ROLE_BADGE_COLORS[user.role]}>
    {ROLE_LABELS[user.role]}
</Badge>
```

## Common Module Utilities

The `@/modules/common` module provides reusable factories and hooks.

### createCrudAPI

Factory for creating standard CRUD API methods:

```typescript
import { createCrudAPI } from '@/modules/common';

const crudAPI = createCrudAPI<Entity, CreateDTO, UpdateDTO, ListParams>({
  axios: axiosInstance,
  endpoint: '/entities',
});

// Returns: { getAll, getById, create, update, delete }
```

### createQueryKeys

Factory for consistent query key patterns:

```typescript
import { createQueryKeys } from '@/modules/common';

const entityKeys = createQueryKeys<ListParams>('entities');

// Returns:
// entityKeys.all         → ["entities"]
// entityKeys.lists()     → ["entities", "list"]
// entityKeys.list(params)→ ["entities", "list", params]
// entityKeys.details()   → ["entities", "detail"]
// entityKeys.detail(id)  → ["entities", "detail", id]
```

### useTableFilters

Generic hook for managing table filters via URL search params:

```typescript
import { useTableFilters } from '@/modules/common';

interface MyFilters extends BaseTableFilters {
  search: string;
  status: string;
}

const { filters, setFilter, setPage, resetFilters, hasActiveFilters } = useTableFilters<MyFilters>({
  defaults: { page: 1, limit: 10, search: '', status: '' },
  resetPageOn: ['search', 'status'], // Reset to page 1 when these change
});
```

## Application Components

### DataTable

Generic data table with loading states, pagination, and empty states:

```typescript
import { DataTable, type ColumnDef } from "@/components/application/data-table/data-table";

const columns: ColumnDef<User>[] = [
    {
        id: "name",
        header: "Name",
        isRowHeader: true,
        cell: (user) => <span>{user.name}</span>,
    },
    {
        id: "actions",
        header: "",
        cell: (user) => <RowActions user={user} />,
    },
];

<DataTable
    data={users}
    columns={columns}
    isLoading={isLoading}
    meta={meta}
    page={filters.page}
    onPageChange={setPage}
    title="Users"
    badge={meta?.total}
    hasActiveFilters={hasActiveFilters}
    emptyState={{
        icon: Users01,
        title: "No users found",
        description: "There are no users to display.",
        filteredDescription: "No users match your filters.",
    }}
    headerContent={<Filters />}
/>
```

### Error Boundaries

Catch and handle errors gracefully:

```typescript
import { ErrorBoundary } from "@/components/application/error-boundary/error-boundary";
import { QueryErrorBoundary } from "@/components/application/error-boundary/query-error-boundary";

// For general React errors
<ErrorBoundary>
    <MyComponent />
</ErrorBoundary>

// For React Query errors (with retry integration)
<QueryErrorBoundary>
    <DataFetchingComponent />
</QueryErrorBoundary>
```

## Page Metadata

Set page title and meta description for SEO:

```typescript
import { usePageMetadata } from "@/libs/usePageMetadata";

export const UsersPage = () => {
    usePageMetadata({
        title: "Users",
        description: "Manage system users" // optional
    });

    return <div>...</div>;
};
```

## Sidebar Navigation

Configure sidebar items in `src/layouts/DashboardLayout/Sidebar.tsx`:

```typescript
import { Home03, Users01, Folder } from '@untitledui/icons';

const navItems: (NavItemType | NavItemDividerType)[] = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: Home03,
  },
  {
    label: 'Users',
    href: '/dashboard/users',
    icon: Users01,
  },
  {
    divider: true, // Section divider
    label: 'Settings', // Divider label (shown when expanded)
  },
  {
    label: 'Settings',
    href: '/dashboard/settings',
    icon: Settings01,
  },
];
```

The sidebar supports collapsed mode with icon-only navigation and horizontal dividers.

## Query Key Factory

Query keys are defined in the module's `constants/` folder:

```typescript
// src/modules/users/constants/query-keys.ts
export const userQueryKeys = {
  all: ['users'] as const,
  profile: () => [...userQueryKeys.all, 'profile'] as const,
  detail: (id: string) => [...userQueryKeys.all, 'detail', id] as const,
  list: () => [...userQueryKeys.all, 'list'] as const,
};
```

Usage in services:

```typescript
import { userQueryKeys } from '../constants';

export const useUserProfile = () => {
  return useQuery({
    queryKey: userQueryKeys.profile(),
    queryFn: usersAPI.getMe,
  });
};
```

## Authentication System

### Token Storage

Tokens are stored in localStorage:

```typescript
import { tokenStorage } from '@/libs/storage';

tokenStorage.setTokens(accessToken, refreshToken);
tokenStorage.getAccessToken();
tokenStorage.getRefreshToken();
tokenStorage.clearTokens();
tokenStorage.hasValidToken();
```

### Token Flow

1. Login/Register: Backend returns tokens → stored in localStorage
2. API Requests: Token added via axios interceptor (`Authorization: Bearer ${token}`)
3. Token Refresh: On 401 response, refresh endpoint is called automatically
4. Logout: Tokens cleared from localStorage

### Adding Protected Routes

Edit `src/routes/index.tsx`:

```typescript
{
    path: "your-route",
    element: (
        <AuthGuard>
            <YourLayout />
        </AuthGuard>
    ),
    children: [...],
}
```

## Module Structure

Each module follows a layered architecture:

```
modules/[module-name]/
├── api/
│   └── [module]API.ts        # API endpoint functions
├── constants/
│   ├── query-keys.ts         # Query key factory
│   └── index.ts              # Constants exports
├── libs/
│   ├── use[Module]Filters.ts # Table filter hooks
│   └── index.ts              # Libs exports
├── services/
│   └── use[Action].ts        # TanStack Query hooks
├── types/
│   ├── [TypeName].ts         # Individual type files (PascalCase)
│   └── index.ts              # Types exports
├── ui/
│   ├── [Module]Table.tsx     # Table component
│   ├── [Module]Filters.tsx   # Filters component
│   ├── Create[Entity]Modal.tsx
│   ├── Edit[Entity]Modal.tsx
│   ├── Delete[Entity]Dialog.tsx
│   └── index.ts              # UI exports
└── index.ts                  # Public module exports
```

### Module Generator

The fastest way to create a new CRUD module:

```bash
pnpm generate:module <module-name>
```

**Examples:**

```bash
pnpm generate:module product    # Creates: products module
pnpm generate:module category   # Creates: categories module (handles irregular plurals)
pnpm generate:module person     # Creates: people module
```

**What gets generated:**

- `src/modules/<plural>/` - Complete module with types, API, services, libs, UI
- `src/pages/<Plural>Page.tsx` - Page with CRUD functionality
- Route at `/dashboard/<plural>`
- Sidebar navigation item

**Generated UI components:**

- `<Plural>Table` - DataTable with columns and row actions
- `<Plural>Filters` - Search input with debounce
- `Create<Singular>Modal` - Create form with validation
- `Edit<Singular>Modal` - Edit form with pre-populated data
- `Delete<Singular>Dialog` - Confirmation dialog

After generating, customize:

1. Update types in `src/modules/<plural>/types/`
2. Add columns to the table in `ui/<Plural>Table.tsx`
3. Add form fields to modals
4. Run `pnpm type-check` to verify

### Manual Module Creation

For custom modules, create the folder structure manually:

```typescript
// 1. Types
// src/modules/posts/types/Post.ts
export type Post = {
  id: string;
  title: string;
  content: string;
};

// 2. Query Keys (or use createQueryKeys factory)
// src/modules/posts/constants/query-keys.ts
import { createQueryKeys } from '@/modules/common';

export const postQueryKeys = createQueryKeys<PostsParams>('posts');

// 3. API (or use createCrudAPI factory)
// src/modules/posts/api/postsAPI.ts
import { createCrudAPI } from '@/modules/common';

export const postsAPI = createCrudAPI<Post, CreatePostRequest, UpdatePostRequest, PostsParams>({
  axios: axiosInstance,
  endpoint: '/posts',
});

// 4. Service hooks
// src/modules/posts/services/usePosts.ts
export const usePosts = (params: PostsParams) => {
  return useQuery({
    queryKey: postQueryKeys.list(params),
    queryFn: () => postsAPI.getAll(params),
  });
};
```

## Validators

Validators use Zod and are located in `src/libs/validators/`.

```typescript
// src/libs/validators/create-post.ts
import { z } from 'zod';

export const createPostValidator = z.object({
  title: z.string({ error: 'Title is required' }).min(1, 'Title is required'),
  content: z.string({ error: 'Content is required' }).min(1, 'Content is required'),
});

export type CreatePostFormData = z.infer<typeof createPostValidator>;
```

Usage with React Hook Form:

```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createPostValidator, CreatePostFormData } from '@/libs/validators/create-post';

const form = useForm<CreatePostFormData>({
  resolver: zodResolver(createPostValidator),
});
```

## React Hook Form Components

RHF-adapted components are in `src/components/base/_rhf/`. They wrap base components with `useController`.

Available components:

- `RHFInput` - Text input
- `RHFPasswordInput` - Password input with visibility toggle
- `RHFTextarea` - Textarea
- `RHFCheckbox` - Checkbox

Usage:

```typescript
import { RHFInput } from "@/components/base/_rhf/rhf-input";

<RHFInput
    name="email"
    control={form.control}
    label="Email"
    placeholder="Enter your email"
/>
```

## Axios Instances

Two axios instances are available in `src/services/index.ts`:

- `axiosInstance` (default export): For authenticated requests. Includes 401 interceptor that automatically refreshes tokens.
- `authAxiosInstance`: For auth endpoints (login, register). No token refresh interceptor.

## Theme System

Theme toggling uses class-based switching via `ThemeProvider`:

- Light mode: `light-mode` class
- Dark mode: `dark-mode` class
- System mode: follows OS preference

```typescript
import { useTheme } from '@/providers/theme-provider';

const { theme, setTheme, cycleTheme } = useTheme();
// theme: "light" | "dark" | "system"
```

## Error Handling

Use `getErrorMessage` for consistent error messages:

```typescript
import { getErrorMessage } from '@/modules/common';

onError: (error) => {
  toast.error(getErrorMessage(error, 'Failed to save'));
};
```

## API Response Types

Generic pagination types are available in `@/modules/common`:

```typescript
import { PaginatedResponse, PaginationMeta } from '@/modules/common';

// PaginationMeta structure
interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

// Usage with your data type
type PostsResponse = PaginatedResponse<Post>;
// Resolves to: { data: Post[]; meta: PaginationMeta; }
```

## Code Style

- Prefer editing existing files over creating new ones
- Keep components focused and single-purpose
- Use TypeScript strict mode
- Run `pnpm lint` before committing
- **DO NOT write comments in code** - Code should be self-documenting through clear naming and structure

## AI Agent Guidelines

Rules and patterns for AI-assisted development.

### Import Order

Imports must follow this order (enforced by ESLint):

```typescript
// 1. React and external libraries
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';

// 2. Internal modules (@/modules/*)
import { useUsers } from '@/modules/users';
import { Role } from '@/modules/auth';

// 3. Components (@/components/*)
import { DataTable } from '@/components/application/data-table/data-table';
import { Button } from '@/components/base/buttons/button';

// 4. Other internal imports (@/*)
import { usePageMetadata } from '@/libs/usePageMetadata';
import { cx } from '@/utils/cx';

// 5. Relative imports (../ and ./)
import { usePostsFilters } from '../libs';
import type { Post } from '../types';
```

### Decision Rules

**When to use Module Generator:**

- Creating a new CRUD resource with list/create/edit/delete
- Standard REST API endpoints
- Needs table, filters, and modals

**When to create manually:**

- Non-CRUD features (auth, settings, dashboards)
- Custom UI patterns
- Complex business logic

**When to use factories:**

- `createCrudAPI` → Standard REST endpoints (GET, POST, PUT, DELETE)
- `createQueryKeys` → Any module with React Query
- `useTableFilters` → Any paginated list with URL-synced filters

**When to add to common module:**

- Utility is used by 2+ modules
- Generic enough to be reusable
- Not tied to specific business logic

### Do NOT

```typescript
// ❌ Don't use axios directly in components
const data = await axios.get("/users");

// ✅ Use module API layer
const data = await usersAPI.getUsers();

// ❌ Don't define query keys inline
useQuery({ queryKey: ["users", "list"] });

// ✅ Use query key factory
useQuery({ queryKey: userQueryKeys.list() });

// ❌ Don't create files outside module structure
src/helpers/userHelpers.ts

// ✅ Keep in module
src/modules/users/libs/userHelpers.ts

// ❌ Don't mix API calls with UI logic
const Component = () => {
    const response = await axiosInstance.get("/users");
};

// ✅ Use service hooks
const Component = () => {
    const { data } = useUsers();
};

// ❌ Don't duplicate types
type User = { id: string; name: string };
type UserData = { id: string; name: string };

// ✅ Reuse and extend
type UserWithPosts = User & { posts: Post[] };

// ❌ Don't hardcode strings for roles
if (user.role === "admin")

// ✅ Use Role enum
if (user.role === Role.Admin)

// ❌ Don't forget error boundaries for data fetching
<UsersTable />

// ✅ Wrap with QueryErrorBoundary
<QueryErrorBoundary>
    <UsersTable />
</QueryErrorBoundary>

// ❌ Don't skip page metadata
export const UsersPage = () => { ... }

// ✅ Always set page title
export const UsersPage = () => {
    usePageMetadata({ title: "Users" });
    ...
}

// ❌ Don't write comments in code
const getUser = () => { // Gets user data
    return usersAPI.getUsers();
};

// ✅ Code should be self-documenting
const getUser = () => {
    return usersAPI.getUsers();
};
```

### Type Conventions

```typescript
// Use `type` for object shapes and unions
type User = {
    id: string;
    name: string;
};

type Status = "active" | "inactive";

// Use `interface` for component props (enables declaration merging)
interface ButtonProps {
    children: ReactNode;
    onClick?: () => void;
}

// Request/Response types use PascalCase with suffix
type CreateUserRequest = { ... };
type UpdateUserRequest = { ... };
type UsersResponse = PaginatedResponse<User>;

// Filter types extend BaseTableFilters
interface UsersFilters extends BaseTableFilters {
    search: string;
    role: Role | "";
}
```

### Component Patterns

**Page component structure:**

```typescript
export const EntityPage = () => {
    // 1. Page metadata
    usePageMetadata({ title: "Entities" });

    // 2. State for modals
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [editing, setEditing] = useState<Entity | null>(null);
    const [deleting, setDeleting] = useState<Entity | null>(null);

    // 3. Render
    return (
        <PageWrapper>
            <PageHeader>...</PageHeader>
            <PageContent>
                <QueryErrorBoundary>
                    <EntityTable onEdit={setEditing} onDelete={setDeleting} />
                </QueryErrorBoundary>
                <CreateEntityModal ... />
                <EditEntityModal ... />
                <DeleteEntityDialog ... />
            </PageContent>
        </PageWrapper>
    );
};
```

**Table component structure:**

```typescript
export const EntityTable = ({ onEdit, onDelete }: Props) => {
    // 1. Filters hook
    const { filters, setPage, setSearch, hasActiveFilters } = useEntityFilters();

    // 2. Data fetching
    const { data, isLoading } = useEntities(filters);

    // 3. Column definitions (memoized)
    const columns = useMemo(() => [...], [onEdit, onDelete]);

    // 4. Render DataTable
    return <DataTable ... />;
};
```

**Modal component structure:**

```typescript
export const CreateEntityModal = ({ isOpen, onClose }: Props) => {
    // 1. Mutation hook
    const { mutate, isPending } = useCreateEntity();

    // 2. Form setup
    const { control, handleSubmit, reset } = useForm({ resolver: zodResolver(schema) });

    // 3. Submit handler
    const onSubmit = (data) => {
        mutate(data, { onSuccess: () => { reset(); onClose(); } });
    };

    // 4. Render modal with form
    return <DialogTrigger isOpen={isOpen} ...>...</DialogTrigger>;
};
```

### File Naming Quick Reference

| What       | Convention          | Example                                 |
| ---------- | ------------------- | --------------------------------------- |
| Page       | `PascalCase` + Page | `UsersPage.tsx`                         |
| Module UI  | `PascalCase`        | `UsersTable.tsx`, `CreateUserModal.tsx` |
| Hooks      | camelCase + use     | `useUsers.ts`, `useCreateUser.ts`       |
| API        | camelCase + API     | `usersAPI.ts`                           |
| Types      | PascalCase          | `User.ts`, `CreateUserRequest.ts`       |
| Utils/libs | camelCase           | `useUsersFilters.ts`                    |
| Constants  | kebab-case          | `query-keys.ts`                         |

## Resources

This template uses [Untitled UI React](https://www.untitledui.com/react) components.

- [Untitled UI Documentation](https://www.untitledui.com/react/docs/introduction)
- [Untitled UI Icons](https://www.untitledui.com/react/resources/icons)
# fonetika-frontend
