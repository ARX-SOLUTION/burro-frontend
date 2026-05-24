import { useQuery } from '@tanstack/react-query';

import { adminAPI } from '../api/adminAPI';
import { adminQueryKeys } from '../constants/query-keys';

export const useAdminXpRanking = (
  period: 'daily' | 'weekly' | 'monthly' | 'all' = 'weekly',
  enabled = true,
) => {
  return useQuery({
    queryKey: adminQueryKeys.xpRanking(period),
    queryFn: () => adminAPI.getXpRanking(period),
    staleTime: 60_000,
    enabled,
    retry: false,
  });
};
