import { useQuery } from '@tanstack/react-query';

import { tokenStorage } from '@/libs/storage';

import { usersAPI } from '../api/usersAPI';
import { userQueryKeys } from '../constants';

export const useUserProfile = () => {
  return useQuery({
    queryKey: userQueryKeys.profile(),
    queryFn: usersAPI.getMe,
    enabled: tokenStorage.hasValidToken(),
    staleTime: 60 * 1000,
    retry: false,
  });
};
