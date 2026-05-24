import { lazy } from 'react';
import { type RouteObject } from 'react-router-dom';

import { AuthGuard, StudentGuard } from '@/components/guards';

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
const BurroChildrenPage = lazy(() =>
  import('@/pages/BurroChildrenPage').then((m) => ({ default: m.BurroChildrenPage })),
);
const BurroAddChildPage = lazy(() =>
  import('@/pages/BurroAddChildPage').then((m) => ({ default: m.BurroAddChildPage })),
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
    element: (
      <AuthGuard>
        <StudentGuard>
          <BurroHomePage />
        </StudentGuard>
      </AuthGuard>
    ),
  },
  {
    path: 'burro/modules',
    element: (
      <AuthGuard>
        <StudentGuard>
          <BurroModulePage />
        </StudentGuard>
      </AuthGuard>
    ),
  },
  {
    path: 'burro/practice/:moduleId',
    element: (
      <AuthGuard>
        <StudentGuard>
          <BurroPracticePage />
        </StudentGuard>
      </AuthGuard>
    ),
  },
  {
    path: 'burro/profile',
    element: (
      <AuthGuard>
        <StudentGuard>
          <BurroProfilePage />
        </StudentGuard>
      </AuthGuard>
    ),
  },
  {
    path: 'burro/leaderboard',
    element: (
      <AuthGuard>
        <StudentGuard>
          <BurroLeaderboardPage />
        </StudentGuard>
      </AuthGuard>
    ),
  },
  {
    path: 'burro/statistics',
    element: (
      <AuthGuard>
        <StudentGuard>
          <BurroStatisticsPage />
        </StudentGuard>
      </AuthGuard>
    ),
  },
  {
    path: 'burro/children',
    element: (
      <AuthGuard>
        <StudentGuard>
          <BurroChildrenPage />
        </StudentGuard>
      </AuthGuard>
    ),
  },
  {
    path: 'burro/children/add',
    element: (
      <AuthGuard>
        <StudentGuard>
          <BurroAddChildPage />
        </StudentGuard>
      </AuthGuard>
    ),
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
];
