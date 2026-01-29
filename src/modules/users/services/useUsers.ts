import { useQuery } from '@tanstack/react-query';

import type { GetUsersParams } from '../api/usersAPI';
import { usersAPI } from '../api/usersAPI';
import { userQueryKeys } from '../constants';

export const useUsers = (params: GetUsersParams = {}) => {
  return useQuery({
    queryKey: userQueryKeys.list(params),
    queryFn: () => usersAPI.getUsers(params),
  });
};
