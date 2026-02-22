import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';

const HomePage = lazy(() => import('@/pages/HomePage').then((m) => ({ default: m.HomePage })));
const NotFoundPage = lazy(() =>
  import('@/pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage })),
);
const ArabTiliBotPage = lazy(() =>
  import('@/pages/ArabTiliBotPage').then((m) => ({ default: m.ArabTiliBotPage })),
);

export const publicRoutes: RouteObject[] = [
  {
    index: true,
    element: <HomePage />,
  },
  {
    path: 'arab-tili',
    element: <ArabTiliBotPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
];
