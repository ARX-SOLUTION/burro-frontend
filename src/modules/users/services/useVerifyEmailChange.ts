import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { getErrorMessage } from '@/modules/common';

import { usersAPI } from '../api/usersAPI';
import type { VerifyEmailChangeRequest } from '../types';

export const useVerifyEmailChange = () => {
  return useMutation({
    mutationFn: (data: VerifyEmailChangeRequest) => usersAPI.verifyEmailChange(data),
    onSuccess: () => {
      toast.success('Email changed successfully');
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, 'Failed to verify email change'));
    },
  });
};
