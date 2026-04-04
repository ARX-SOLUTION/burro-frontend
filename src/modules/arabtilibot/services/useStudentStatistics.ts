import { useQuery } from '@tanstack/react-query';

import { burroAPI } from '../api/burroAPI';
import { burroQueryKeys } from '../constants/query-keys';

export const useStudentStatistics = () => {
  return useQuery({
    queryKey: burroQueryKeys.statistics(),
    queryFn: burroAPI.getStudentStatistics,
  });
};
