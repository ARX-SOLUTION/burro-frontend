# Burro Student App
Domain: student.burroarab.uz | Port: 5173 | Package: @burro/student

Stack: Vite + React + TypeScript + Tailwind + TanStack Query + Sonner
Auth: Telegram Mini App (StudentGuard)

Modules: src/modules/arabtilibot (quizzes, practice, results, leaderboard, home, statistics)
Shared: import from @burro/shared — never use local copies of auth/common/users

Routes: /burro /burro/modules /burro/practice/:moduleId
        /burro/results /burro/leaderboard /burro/statistics /burro/profile

Commands:
  make dev-student    → pnpm --filter @burro/student dev
  make build-student  → pnpm --filter @burro/student build
  pm2 name: burro-student
