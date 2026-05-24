import { useQuery } from '@tanstack/react-query';

import { adminAPI } from '../api/adminAPI';
import { adminQueryKeys } from '../constants/query-keys';

export const useAdminOverview = (enabled = true) => {
  return useQuery({
    queryKey: adminQueryKeys.overview(),
    queryFn: adminAPI.getOverview,
    staleTime: 60_000,
    enabled,
    retry: false,
  });
};
