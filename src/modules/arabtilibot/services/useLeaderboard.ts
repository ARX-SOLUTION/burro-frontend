import { useQuery } from '@tanstack/react-query';

import { burroAPI } from '../api/burroAPI';
import { burroQueryKeys } from '../constants/query-keys';
import type { LeaderboardPeriod } from '../types/api';

export const useLeaderboard = (period: LeaderboardPeriod) => {
  return useQuery({
    queryKey: burroQueryKeys.leaderboard(period),
    queryFn: () => burroAPI.getLeaderboard(period),
  });
};
