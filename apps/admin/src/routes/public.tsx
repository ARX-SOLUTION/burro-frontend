import { lazy } from 'react';
import { Navigate, type RouteObject } from 'react-router-dom';

const NotFoundPage = lazy(() =>
  import('@/pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage })),
);

export const publicRoutes: RouteObject[] = [
  {
    index: true,
    element: <Navigate to="/dashboard" replace />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
];
