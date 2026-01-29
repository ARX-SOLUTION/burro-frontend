import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { getErrorMessage } from '@/modules/common/libs/getErrorMessage';

import { authAPI } from '../api/authAPI';

export const useResendVerificationMutation = () => {
  return useMutation({
    mutationFn: (email: string) => authAPI.resendVerification(email),
    onSuccess: () => {
      toast.success(
        'If an account with that email exists and is not verified, a verification email has been sent',
      );
    },
    onError: (error: unknown) => {
      toast.error(getErrorMessage(error, 'Failed to send verification email'));
    },
  });
};
