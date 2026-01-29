import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { getErrorMessage } from '@/modules/common/libs/getErrorMessage';

import { authAPI } from '../api/authAPI';
import type { SignupRequest } from '../types';

export const useSignupMutation = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (payload: SignupRequest) => authAPI.signup(payload),
    onSuccess: () => {
      toast.success(
        'Account created successfully. Please contact an administrator to get access.',
        { duration: 6000 },
      );
      navigate('/auth/signin');
    },
    onError: (error: unknown) => {
      toast.error(getErrorMessage(error, 'Sign up failed'));
    },
  });
};
