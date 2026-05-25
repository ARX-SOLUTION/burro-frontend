import { lazy, type ReactNode } from 'react';
import { type RouteObject } from 'react-router-dom';

import { Role } from '@burro/shared/modules/auth';

import { AuthGuard, StudentGuard } from '@burro/shared/components/guards';

const HomePage = lazy(() => import('@/pages/HomePage').then((m) => ({ default: m.HomePage })));
const NotFoundPage = lazy(() =>
  import('@/pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage })),
);
const BurroWelcomePage = lazy(() =>
  import('@/pages/BurroWelcomePage').then((m) => ({ default: m.BurroWelcomePage })),
);
const BurroHomePage = lazy(() =>
  import('@/pages/BurroHomePage').then((m) => ({ default: m.BurroHomePage })),
);
const BurroModulePage = lazy(() =>
  import('@/pages/BurroModulePage').then((m) => ({ default: m.BurroModulePage })),
);
const BurroPracticePage = lazy(() =>
  import('@/pages/BurroPracticePage').then((m) => ({ default: m.BurroPracticePage })),
);
const BurroProfilePage = lazy(() =>
  import('@/pages/BurroProfilePage').then((m) => ({ default: m.BurroProfilePage })),
);
const BurroLeaderboardPage = lazy(() =>
  import('@/pages/BurroLeaderboardPage').then((m) => ({ default: m.BurroLeaderboardPage })),
);
const BurroStatisticsPage = lazy(() => import('@/pages/BurroStatisticsPage'));
const ModuleMapPage = lazy(() =>
  import('@/pages/ModuleMapPage').then((m) => ({ default: m.ModuleMapPage })),
);
const ResultsPage = lazy(() =>
  import('@/pages/ResultsPage').then((m) => ({ default: m.ResultsPage })),
);
const ModuleCompletedPage = lazy(() =>
  import('@/pages/ModuleCompletedPage').then((m) => ({ default: m.ModuleCompletedPage })),
);

const STUDENT_APP_ROLE_REDIRECTS: Partial<Record<Role, string>> = {
  [Role.Parent]: 'https://parent.burroarab.uz/burro/parent',
  [Role.Admin]: 'https://admin.burroarab.uz/dashboard',
  [Role.Superadmin]: 'https://admin.burroarab.uz/dashboard',
};

const studentRoute = (children: ReactNode) => (
  <AuthGuard>
    <StudentGuard roleRedirects={STUDENT_APP_ROLE_REDIRECTS}>{children}</StudentGuard>
  </AuthGuard>
);

export const publicRoutes: RouteObject[] = [
  {
    index: true,
    element: <HomePage />,
  },
  {
    path: 'burro/welcome',
    element: <BurroWelcomePage />,
  },
  {
    path: 'burro',
    element: studentRoute(<BurroHomePage />),
  },
  {
    path: 'burro/modules',
    element: studentRoute(<BurroModulePage />),
  },
  {
    path: 'burro/practice/:moduleId',
    element: studentRoute(<BurroPracticePage />),
  },
  {
    path: 'burro/profile',
    element: studentRoute(<BurroProfilePage />),
  },
  {
    path: 'burro/leaderboard',
    element: studentRoute(<BurroLeaderboardPage />),
  },
  {
    path: 'burro/statistics',
    element: studentRoute(<BurroStatisticsPage />),
  },
  {
    path: 'burro/modules/:moduleId',
    element: studentRoute(<ModuleMapPage />),
  },
  {
    path: 'burro/results',
    element: (
      <AuthGuard>
        <ResultsPage />
      </AuthGuard>
    ),
  },
  {
    path: 'burro/modules/:moduleId/complete',
    element: studentRoute(<ModuleCompletedPage />),
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
];
