export const ARAB_TILI_ROUTE_PATHS = {
  WELCOME: 'arab-tili',
  LESSONS: 'arab-tili/lessons',
  LESSON: 'arab-tili/lesson',
  LESSON_BY_ID: 'arab-tili/lesson/:id',
  LESSON_PLAY: 'arab-tili/lesson/:id/play',
} as const;

export const ARAB_TILI_ROUTES = {
  WELCOME: `/${ARAB_TILI_ROUTE_PATHS.WELCOME}`,
  LESSONS: `/${ARAB_TILI_ROUTE_PATHS.LESSONS}`,
  LESSON: `/${ARAB_TILI_ROUTE_PATHS.LESSON}`,
  LESSON_BY_ID: (id: string) => `/${ARAB_TILI_ROUTE_PATHS.LESSON}/${id}`,
  LESSON_PLAY: (id: string) => `/${ARAB_TILI_ROUTE_PATHS.LESSON}/${id}/play`,
} as const;
