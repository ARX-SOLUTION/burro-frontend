import { lazy } from 'react';
import { Navigate, type RouteObject } from 'react-router-dom';

import { ARAB_TILI_ROUTE_PATHS } from '@/modules/arabtilibot/constants/routes';

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

export const publicRoutes: RouteObject[] = [
  {
    index: true,
    element: <HomePage />,
  },
  {
    path: ARAB_TILI_ROUTE_PATHS.WELCOME,
    element: <Navigate to="/burro/welcome" replace />,
  },
  {
    path: ARAB_TILI_ROUTE_PATHS.LESSONS,
    element: <Navigate to="/burro" replace />,
  },
  {
    path: ARAB_TILI_ROUTE_PATHS.LESSON,
    element: <Navigate to="/burro/modules" replace />,
  },
  {
    path: ARAB_TILI_ROUTE_PATHS.LESSON_BY_ID,
    element: <Navigate to="/burro/modules" replace />,
  },
  {
    path: ARAB_TILI_ROUTE_PATHS.LESSON_PLAY,
    element: <Navigate to="/burro/modules" replace />,
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
    path: '*',
    element: <NotFoundPage />,
  },
];
