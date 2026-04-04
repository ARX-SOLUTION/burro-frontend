import type { LeaderboardPeriod, ModuleFilter } from '../types/api';

export const burroQueryKeys = {
  all: ['burro'] as const,
  home: () => [...burroQueryKeys.all, 'home'] as const,
  profile: () => [...burroQueryKeys.all, 'profile'] as const,
  statistics: () => [...burroQueryKeys.all, 'statistics'] as const,
  modules: (filter: ModuleFilter = 'all') => [...burroQueryKeys.all, 'modules', filter] as const,
  attempt: (attemptId: string) => [...burroQueryKeys.all, 'attempt', attemptId] as const,
  leaderboard: (period: LeaderboardPeriod) =>
    [...burroQueryKeys.all, 'leaderboard', period] as const,
};
