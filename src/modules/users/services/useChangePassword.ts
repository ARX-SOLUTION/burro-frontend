import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { getErrorMessage } from '@/modules/common';

import { usersAPI } from '../api/usersAPI';
import type { ChangePasswordRequest } from '../types';

export const useChangePassword = () => {
  return useMutation({
    mutationFn: (data: ChangePasswordRequest) => usersAPI.changePassword(data),
    onSuccess: () => {
      toast.success('Password changed successfully');
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, 'Failed to change password'));
    },
  });
};
