import { useNavigate, useSearchParams } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { getErrorMessage } from '@/modules/common/libs/getErrorMessage';
import { userQueryKeys } from '@/modules/users';

import { tokenStorage } from '@/libs/storage';

import { authAPI } from '../api/authAPI';
import { AUTH_SEARCH_PARAMS, getDefaultRedirectForRole } from '../constants';
import { canLogin } from '../libs/role-utils';
import type { SignupRequest } from '../types';

export const useSignupMutation = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  return useMutation({
    mutationFn: (payload: SignupRequest) => authAPI.signup(payload),
    onSuccess: (data) => {
      if (!canLogin(data.user.role)) {
        toast.error("You don't have permission to access this application");
        return;
      }

      tokenStorage.setTokens(data.accessToken, data.refreshToken);
      queryClient.setQueryData(userQueryKeys.profile(), data.user);
      toast.success('Account created successfully');

      const redirectUrl =
        searchParams.get(AUTH_SEARCH_PARAMS.REDIRECT) || getDefaultRedirectForRole(data.user.role);

      if (!data.user.emailVerified) {
        navigate(
          `/auth/verify-email?${AUTH_SEARCH_PARAMS.REDIRECT}=${encodeURIComponent(redirectUrl)}`,
        );
      } else {
        navigate(redirectUrl);
      }
    },
    onError: (error: unknown) => {
      toast.error(getErrorMessage(error, 'Sign up failed'));
    },
  });
};
