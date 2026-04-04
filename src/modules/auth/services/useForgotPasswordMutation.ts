import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { getErrorMessage } from '@/modules/common/libs/getErrorMessage';

import { authAPI } from '../api/authAPI';
import type { ForgotPasswordRequest } from '../types';

export const useForgotPasswordMutation = () => {
  return useMutation({
    mutationFn: (payload: ForgotPasswordRequest) => authAPI.forgotPassword(payload),
    onSuccess: () => {
      toast.success('If an account with that email exists, a password reset link has been sent');
    },
    onError: (error: unknown) => {
      toast.error(getErrorMessage(error, 'Failed to send reset email'));
    },
  });
};
