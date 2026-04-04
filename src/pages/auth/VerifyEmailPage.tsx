import { VerifyEmailForm } from '@/modules/auth/ui';

import { usePageMetadata } from '@/libs/usePageMetadata';

export const VerifyEmailPage = () => {
  usePageMetadata({ title: 'Verify Email' });

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <h1 className="text-display-sm font-semibold text-primary">Verify your email</h1>
          <p className="mt-2 text-md text-tertiary">
            We&apos;ve sent a verification code to your email.
          </p>
        </div>

        <VerifyEmailForm />
      </div>
    </div>
  );
};
