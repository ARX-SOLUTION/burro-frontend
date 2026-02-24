import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';

const HomePage = lazy(() => import('@/pages/HomePage').then((m) => ({ default: m.HomePage })));
const NotFoundPage = lazy(() =>
  import('@/pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage })),
);
const ArabTiliBotPage = lazy(() =>
  import('@/pages/ArabTiliBotPage').then((m) => ({ default: m.ArabTiliBotPage })),
);
const ArabTiliBotLessonsPage = lazy(() =>
  import('@/pages/ArabTiliBotLessonsPage').then((m) => ({ default: m.ArabTiliBotLessonsPage })),
);
const ArabTiliBotLessonPage = lazy(() =>
  import('@/pages/ArabTiliBotLessonPage').then((m) => ({ default: m.ArabTiliBotLessonPage })),
);
const ArabTiliBotLessonPlayPage = lazy(() =>
  import('@/pages/ArabTiliBotLessonPlayPage').then((m) => ({ default: m.ArabTiliBotLessonPlayPage })),
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
    path: 'arab-tili/lessons',
    element: <ArabTiliBotLessonsPage />,
  },
  {
    path: 'arab-tili/lesson',
    element: <ArabTiliBotLessonPage />,
  },
  {
    path: 'arab-tili/lesson/:id',
    element: <ArabTiliBotLessonPage />,
  },
  {
    path: 'arab-tili/lesson/:id/play',
    element: <ArabTiliBotLessonPlayPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
];
