# Burro Admin Panel
Domain: admin.burroarab.uz | Port: 5175 | Package: @burro/admin

Stack: Vite + React + TypeScript + Tailwind + TanStack Query
Auth: Superadmin role (TELEGRAM_ADMIN_ID)

Modules: src/modules/admin (user management, content, analytics)
Shared: import from @burro/shared — never use local copies of auth/common/users

Routes: /admin /admin/users /admin/modules /admin/content

Commands:
  make dev-admin    → pnpm --filter @burro/admin dev
  make build-admin  → pnpm --filter @burro/admin build
  pm2 name: burro-admin
