# Burro Parent App
Domain: parent.burroarab.uz | Port: 5174 | Package: @burro/parent

Stack: Vite + React + TypeScript + Tailwind + TanStack Query + Sonner
Auth: Telegram OAuth (ParentGuard)

Modules: src/modules/parent (children management, monitoring)
Shared: import from @burro/shared — never use local copies of auth/common/users

Routes: /burro/children /burro/children/add /burro/children/:childId /burro/profile

Commands:
  make dev-parent    → pnpm --filter @burro/parent dev
  make build-parent  → pnpm --filter @burro/parent build
  pm2 name: burro-parent
