import { useQuery } from '@tanstack/react-query';

import { burroAPI } from '../api/burroAPI';
import { burroQueryKeys } from '../constants/query-keys';

export const useStudentProfile = () => {
  return useQuery({
    queryKey: burroQueryKeys.profile(),
    queryFn: burroAPI.getStudentProfile,
  });
};
