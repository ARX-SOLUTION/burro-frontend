import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';

import { AUTH_SEARCH_PARAMS, authAPI, buildAuthPathWithRedirect } from '@burro/shared/modules/auth';

import { Button } from '@burro/shared/components/base/buttons/button';
import { Telegram } from '@burro/shared/components/foundations/social-icons';
import { useAuth } from '@burro/shared/hooks/use-auth';
import { usePageMetadata } from '@burro/shared/libs/usePageMetadata';

export const RegisterPage = () => {
  usePageMetadata({ title: 'Create Account' });
  const { isInitiatingTelegram } = useAuth();
  const [searchParams] = useSearchParams();
  const redirectUrl = searchParams.get(AUTH_SEARCH_PARAMS.REDIRECT);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const isTelegramWebApp = Boolean(window.Telegram?.WebApp?.initData);
  const shouldShowTelegramProgress = isTelegramWebApp && isInitiatingTelegram;

  const onTelegramLogin = async () => {
    setIsRedirecting(true);

    try {
      const { url } = await authAPI.telegramUrl(redirectUrl);
      window.location.href = url;
    } catch {
      toast.error('Unable to start Telegram login. Please try again.');
      setIsRedirecting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <h1 className="text-display-sm font-semibold text-primary">Create an account</h1>
          <p className="mt-2 text-md text-tertiary">Get started with your free account today.</p>
        </div>

        {shouldShowTelegramProgress ? (
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 text-center">
            <p className="text-lg font-semibold text-primary">Telegram login detected</p>
            <p className="mt-3 text-sm leading-6 text-tertiary">
              We are verifying your Telegram login using the Telegram SDK. Please wait while your
              session is processed.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            <Button
              color="secondary"
              size="lg"
              className="w-full"
              iconLeading={Telegram}
              isLoading={isRedirecting}
              onClick={onTelegramLogin}
            >
              Continue with Telegram
            </Button>

            <p className="text-center text-sm text-tertiary">
              Already have an account?{' '}
              <Link
                to={buildAuthPathWithRedirect('/auth/login', redirectUrl)}
                className="font-semibold text-brand-secondary hover:text-brand-secondary_hover"
              >
                Sign in
              </Link>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
