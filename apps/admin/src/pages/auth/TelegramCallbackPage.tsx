import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { AUTH_SEARCH_PARAMS, authAPI, getDefaultRedirectForRole } from '@burro/shared/modules/auth';
import { userQueryKeys } from '@burro/shared/modules/users';

import { tokenStorage } from '@burro/shared/libs/storage';
import { usePageMetadata } from '@burro/shared/libs/usePageMetadata';

export const TelegramCallbackPage = () => {
  usePageMetadata({ title: 'Telegram login' });

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const code = searchParams.get('code');
  const redirectUrl = searchParams.get(AUTH_SEARCH_PARAMS.REDIRECT);

  const { mutate, isPending } = useMutation({
    mutationFn: () => authAPI.telegramCodeLogin({ code: code ?? '' }),
    onSuccess: (data) => {
      tokenStorage.setTokens(data.accessToken, data.refreshToken);
      queryClient.setQueryData(userQueryKeys.profile(), data.user);
      toast.success('Signed in with Telegram');

      const destination = redirectUrl || getDefaultRedirectForRole(data.user.role);
      navigate(destination);
    },
    onError: () => {
      toast.error('Telegram login failed. Please try again.');
      navigate('/auth/login');
    },
  });

  useEffect(() => {
    if (!code) {
      navigate('/auth/login');
      return;
    }

    mutate();
  }, [code, navigate, mutate]);

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-sm rounded-3xl border border-slate-200 bg-slate-50 p-8 text-center">
        <p className="text-lg font-semibold text-primary">Signing in with Telegram</p>
        <p className="mt-3 text-sm leading-6 text-tertiary">
          Please wait while we complete your Telegram login.
        </p>
        {isPending && (
          <p className="mt-4 text-sm font-medium text-brand-secondary">
            Finalizing your session...
          </p>
        )}
      </div>
    </div>
  );
};
