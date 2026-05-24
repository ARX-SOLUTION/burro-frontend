import { lazy } from 'react';
import { Navigate, type RouteObject } from 'react-router-dom';

import { AuthGuard, ParentGuard } from '@burro/shared/components/guards';

const NotFoundPage = lazy(() =>
  import('@/pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage })),
);
const BurroProfilePage = lazy(() =>
  import('@/pages/BurroProfilePage').then((m) => ({ default: m.BurroProfilePage })),
);
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
const ResultsPage = lazy(() =>
  import('@/pages/ResultsPage').then((m) => ({ default: m.ResultsPage })),
);

export const publicRoutes: RouteObject[] = [
  {
    index: true,
    element: <Navigate to="/burro/parent" replace />,
  },
  {
    path: 'burro/profile',
    element: (
      <AuthGuard>
        <ParentGuard>
          <BurroProfilePage />
        </ParentGuard>
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
    path: 'burro/results',
    element: (
      <AuthGuard>
        <ResultsPage />
      </AuthGuard>
    ),
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
];
