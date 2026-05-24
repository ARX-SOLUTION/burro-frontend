import { useQuery } from '@tanstack/react-query';

import { burroAPI } from '../api/burroAPI';
import { burroQueryKeys } from '../constants/query-keys';

export const useModuleDetail = (moduleId: string) => {
  return useQuery({
    queryKey: burroQueryKeys.moduleDetail(moduleId),
    queryFn: () => burroAPI.getModuleDetail(moduleId),
    enabled: !!moduleId,
  });
};
