import { useQuery } from '@tanstack/react-query';

import { burroAPI } from '../api/burroAPI';
import { burroQueryKeys } from '../constants/query-keys';

export const useStudentHome = () => {
  return useQuery({
    queryKey: burroQueryKeys.home(),
    queryFn: burroAPI.getStudentHome,
  });
};
