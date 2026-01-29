import { useQuery } from '@tanstack/react-query';

import { usersAPI } from '../api/usersAPI';
import { userQueryKeys } from '../constants';

export const useUser = (id: string) => {
  return useQuery({
    queryKey: userQueryKeys.detail(id),
    queryFn: () => usersAPI.getUserById(id),
    enabled: !!id,
  });
};
