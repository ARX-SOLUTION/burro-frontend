import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { getErrorMessage } from '@burro/shared/modules/common';

import { usersAPI } from '../api/usersAPI';
import { userQueryKeys } from '../constants';
import type { UpdateUserRequest } from '../types';

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateUserRequest) => usersAPI.updateMe(data),
    onSuccess: (updatedUser) => {
      queryClient.setQueryData(userQueryKeys.profile(), updatedUser);
      toast.success('Profile updated successfully');
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, 'Failed to update profile'));
    },
  });
};
