import { useNavigate, useSearchParams } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { getErrorMessage } from '@/modules/common/libs/getErrorMessage';
import { userQueryKeys } from '@/modules/users';

import { authAPI } from '../api/authAPI';
import { AUTH_SEARCH_PARAMS, DEFAULT_AUTH_REDIRECT } from '../constants';
import type { VerifyEmailRequest } from '../types';

export const useVerifyEmailMutation = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  const redirectUrl = searchParams.get(AUTH_SEARCH_PARAMS.REDIRECT) || DEFAULT_AUTH_REDIRECT;

  return useMutation({
    mutationFn: (payload: VerifyEmailRequest) => authAPI.verifyEmail(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userQueryKeys.profile() });
      toast.success('Email verified successfully');
      navigate(redirectUrl);
    },
    onError: (error: unknown) => {
      toast.error(getErrorMessage(error, 'Failed to verify email'));
    },
  });
};
