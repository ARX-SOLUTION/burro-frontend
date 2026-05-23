import { useState } from 'react';
import { toast } from 'sonner';

import { authAPI } from '@/modules/auth';
import { LoginForm } from '@/modules/auth/ui';

import { Button } from '@/components/base/buttons/button';
import { Telegram } from '@/components/foundations/social-icons';
import { useAuth } from '@/hooks/use-auth';
import { usePageMetadata } from '@/libs/usePageMetadata';

export const LoginPage = () => {
  usePageMetadata({ title: 'Sign In' });
  const { isInitiatingTelegram } = useAuth();
  const [isRedirecting, setIsRedirecting] = useState(false);
  const isTelegramWebApp = Boolean(window.Telegram?.WebApp?.initData);
  const shouldShowTelegramProgress = isTelegramWebApp && isInitiatingTelegram;

  const onTelegramLogin = async () => {
    setIsRedirecting(true);

    try {
      const { url } = await authAPI.telegramUrl();
      window.location.href = url;
    } catch (error) {
      toast.error('Unable to start Telegram login. Please try again.');
      setIsRedirecting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <h1 className="text-display-sm font-semibold text-primary">Welcome back</h1>
          <p className="mt-2 text-md text-tertiary">Sign in to your account to continue.</p>
        </div>

        {shouldShowTelegramProgress ? (
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 text-center">
            <p className="text-lg font-semibold text-primary">Telegram login detected</p>
            <p className="mt-3 text-sm leading-6 text-tertiary">
              We are verifying your Telegram login using the Telegram SDK. Please wait while your
              session is processed.
            </p>
            <p className="mt-4 text-sm font-medium text-brand-secondary">
              Signing in with Telegram...
            </p>
          </div>
        ) : (
          <>
            <div className="mb-6">
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
              <p className="mt-3 text-center text-sm text-tertiary">
                Or sign in with your email and password.
              </p>
            </div>

            <LoginForm />
          </>
        )}
      </div>
    </div>
  );
};
