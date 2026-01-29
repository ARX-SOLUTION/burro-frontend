import { useNavigate, useSearchParams } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { getErrorMessage } from '@/modules/common/libs/getErrorMessage';
import { userQueryKeys } from '@/modules/users';

import { tokenStorage } from '@/libs/storage';

import { authAPI } from '../api/authAPI';
import { AUTH_SEARCH_PARAMS, DEFAULT_AUTH_REDIRECT } from '../constants';
import { canLogin } from '../libs/role-utils';
import type { SigninRequest } from '../types';

export const useSigninMutation = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const redirectUrl = searchParams.get(AUTH_SEARCH_PARAMS.REDIRECT) || DEFAULT_AUTH_REDIRECT;

  return useMutation({
    mutationFn: (payload: SigninRequest) => authAPI.signin(payload),
    onSuccess: (data) => {
      if (!canLogin(data.user.role)) {
        toast.error("You don't have permission to access this application");
        return;
      }

      tokenStorage.setTokens(data.accessToken, data.refreshToken);
      queryClient.setQueryData(userQueryKeys.profile(), data.user);
      toast.success('Signed in successfully');

      if (!data.user.emailVerified) {
        const verifyUrl =
          redirectUrl !== DEFAULT_AUTH_REDIRECT
            ? `/auth/verify-email?${AUTH_SEARCH_PARAMS.REDIRECT}=${encodeURIComponent(redirectUrl)}`
            : '/auth/verify-email';
        navigate(verifyUrl);
      } else {
        navigate(redirectUrl);
      }
    },
    onError: (error: unknown) => {
      toast.error(getErrorMessage(error, 'Sign in failed'));
    },
  });
};
