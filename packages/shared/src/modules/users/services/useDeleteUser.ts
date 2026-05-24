import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { usersAPI } from '../api/usersAPI';
import { userQueryKeys } from '../constants';

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => usersAPI.deleteUser(id),
    onSuccess: () => {
      toast.success('User deleted successfully');
      queryClient.invalidateQueries({ queryKey: userQueryKeys.lists() });
    },
    onError: () => {
      toast.error('Failed to delete user');
    },
  });
};
