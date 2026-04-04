import { useQuery } from '@tanstack/react-query';

import { burroAPI } from '../api/burroAPI';
import { burroQueryKeys } from '../constants/query-keys';
import type { ModuleFilter } from '../types/api';

export const useBurroModules = (filter: ModuleFilter = 'all') => {
  return useQuery({
    queryKey: burroQueryKeys.modules(filter),
    queryFn: () => burroAPI.getModules(filter),
  });
};
