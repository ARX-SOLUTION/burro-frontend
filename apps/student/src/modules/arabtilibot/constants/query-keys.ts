import type { LeaderboardPeriod, ModuleFilter, StatisticsChartPeriod } from '../types/api';

export const burroQueryKeys = {
  all: ['burro'] as const,
  home: () => [...burroQueryKeys.all, 'home'] as const,
  profile: () => [...burroQueryKeys.all, 'profile'] as const,
  statistics: () => [...burroQueryKeys.all, 'statistics'] as const,
  statisticsChart: (period: StatisticsChartPeriod) =>
    [...burroQueryKeys.all, 'statisticsChart', period] as const,
  modules: (filter: ModuleFilter = 'all') => [...burroQueryKeys.all, 'modules', filter] as const,
  moduleDetail: (moduleId: string) => [...burroQueryKeys.all, 'moduleDetail', moduleId] as const,
  attempt: (attemptId: string) => [...burroQueryKeys.all, 'attempt', attemptId] as const,
  leaderboard: (period: LeaderboardPeriod) =>
    [...burroQueryKeys.all, 'leaderboard', period] as const,
};
