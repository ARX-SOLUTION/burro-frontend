export type AdminOverviewModuleStat = {
  id: string;
  titleUz: string;
};

export type AdminOverviewResponse = {
  total_students: number;
  active_today: number;
  total_modules: number;
  modules_stats: AdminOverviewModuleStat[];
};

export type AdminXpRankingEntry = {
  rank: number;
  full_name: string;
  xp: number;
};

export type AdminXpRankingResponse = {
  period: 'daily' | 'weekly' | 'monthly' | 'all';
  ranking: AdminXpRankingEntry[];
};
