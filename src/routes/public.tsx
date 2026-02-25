import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';

import { ARAB_TILI_ROUTE_PATHS } from '@/modules/arabtilibot/constants/routes';

const HomePage = lazy(() => import('@/pages/HomePage').then((m) => ({ default: m.HomePage })));
const NotFoundPage = lazy(() =>
  import('@/pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage })),
);
const ArabTiliBotWelcomePage = lazy(() =>
  import('@/pages/ArabTiliBotWelcomePage').then((m) => ({ default: m.ArabTiliBotWelcomePage })),
);
const ArabTiliBotLessonsPage = lazy(() =>
  import('@/pages/ArabTiliBotLessonsPage').then((m) => ({ default: m.ArabTiliBotLessonsPage })),
);
const ArabTiliBotLessonPage = lazy(() =>
  import('@/pages/ArabTiliBotLessonPage').then((m) => ({ default: m.ArabTiliBotLessonPage })),
);
const ArabTiliBotLessonPlayPage = lazy(() =>
  import('@/pages/ArabTiliBotLessonPlayPage').then((m) => ({
    default: m.ArabTiliBotLessonPlayPage,
  })),
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

export const publicRoutes: RouteObject[] = [
  {
    index: true,
    element: <HomePage />,
  },
  {
    path: ARAB_TILI_ROUTE_PATHS.WELCOME,
    element: <ArabTiliBotWelcomePage />,
  },
  {
    path: ARAB_TILI_ROUTE_PATHS.LESSONS,
    element: <ArabTiliBotLessonsPage />,
  },
  {
    path: ARAB_TILI_ROUTE_PATHS.LESSON,
    element: <ArabTiliBotLessonPage />,
  },
  {
    path: ARAB_TILI_ROUTE_PATHS.LESSON_BY_ID,
    element: <ArabTiliBotLessonPage />,
  },
  {
    path: ARAB_TILI_ROUTE_PATHS.LESSON_PLAY,
    element: <ArabTiliBotLessonPlayPage />,
  },
  {
    path: 'burro/welcome',
    element: <BurroWelcomePage />,
  },
  {
    path: 'burro',
    element: <BurroHomePage />,
  },
  {
    path: 'burro/modules',
    element: <BurroModulePage />,
  },
  {
    path: 'burro/practice/:moduleId',
    element: <BurroPracticePage />,
  },
  {
    path: 'burro/profile',
    element: <BurroProfilePage />,
  },
  {
    path: 'burro/leaderboard',
    element: <BurroLeaderboardPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
];
