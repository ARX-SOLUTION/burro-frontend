import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { usersAPI } from '../api/usersAPI';
import { userQueryKeys } from '../constants';
import type { AdminUpdateUserRequest } from '../types';

export const useAdminUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: AdminUpdateUserRequest }) =>
      usersAPI.adminUpdateUser(id, data),
    onSuccess: (_, variables) => {
      toast.success('User updated successfully');
      queryClient.invalidateQueries({ queryKey: userQueryKeys.lists() });
      queryClient.invalidateQueries({ queryKey: userQueryKeys.detail(variables.id) });
    },
    onError: () => {
      toast.error('Failed to update user');
    },
  });
};
