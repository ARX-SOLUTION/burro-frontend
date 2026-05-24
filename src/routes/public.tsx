import { lazy } from 'react';
import { type RouteObject } from 'react-router-dom';

import { AuthGuard, ParentGuard, StudentGuard } from '@/components/guards';

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
const ParentDashboardPage = lazy(() =>
  import('@/pages/ParentDashboardPage').then((m) => ({ default: m.ParentDashboardPage })),
);
const ParentChildDetailPage = lazy(() =>
  import('@/pages/ParentChildDetailPage').then((m) => ({ default: m.ParentChildDetailPage })),
);
const ModuleMapPage = lazy(() =>
  import('@/pages/ModuleMapPage').then((m) => ({ default: m.ModuleMapPage })),
);
const ResultsPage = lazy(() =>
  import('@/pages/ResultsPage').then((m) => ({ default: m.ResultsPage })),
);
const ModuleCompletedPage = lazy(() =>
  import('@/pages/ModuleCompletedPage').then((m) => ({ default: m.ModuleCompletedPage })),
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
        <ParentGuard>
          <BurroChildrenPage />
        </ParentGuard>
      </AuthGuard>
    ),
  },
  {
    path: 'burro/children/add',
    element: (
      <AuthGuard>
        <ParentGuard>
          <BurroAddChildPage />
        </ParentGuard>
      </AuthGuard>
    ),
  },
  {
    path: 'burro/parent',
    element: (
      <AuthGuard>
        <ParentGuard>
          <ParentDashboardPage />
        </ParentGuard>
      </AuthGuard>
    ),
  },
  {
    path: 'burro/parent/children/:childId',
    element: (
      <AuthGuard>
        <ParentGuard>
          <ParentChildDetailPage />
        </ParentGuard>
      </AuthGuard>
    ),
  },
  {
    path: 'burro/modules/:moduleId',
    element: (
      <AuthGuard>
        <StudentGuard>
          <ModuleMapPage />
        </StudentGuard>
      </AuthGuard>
    ),
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
    element: (
      <AuthGuard>
        <StudentGuard>
          <ModuleCompletedPage />
        </StudentGuard>
      </AuthGuard>
    ),
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
];
