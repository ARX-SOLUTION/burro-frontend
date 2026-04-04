import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { getErrorMessage } from '@/modules/common/libs/getErrorMessage';

import { authAPI } from '../api/authAPI';
import type { ResetPasswordRequest } from '../types';

export const useResetPasswordMutation = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (payload: ResetPasswordRequest) => authAPI.resetPassword(payload),
    onSuccess: () => {
      toast.success('Password reset successfully');
      navigate('/auth/login');
    },
    onError: (error: unknown) => {
      toast.error(getErrorMessage(error, 'Failed to reset password'));
    },
  });
};
