import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { usersAPI } from '../api/usersAPI';
import { userQueryKeys } from '../constants';
import type { CreateUserRequest } from '../types';

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateUserRequest) => usersAPI.createUser(data),
    onSuccess: () => {
      toast.success('User created successfully');
      queryClient.invalidateQueries({ queryKey: userQueryKeys.lists() });
    },
    onError: () => {
      toast.error('Failed to create user');
    },
  });
};
