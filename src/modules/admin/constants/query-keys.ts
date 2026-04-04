export const adminQueryKeys = {
  all: ['admin'] as const,
  overview: () => [...adminQueryKeys.all, 'overview'] as const,
  xpRanking: (period: 'daily' | 'weekly' | 'monthly' | 'all') =>
    [...adminQueryKeys.all, 'xp-ranking', period] as const,
};
