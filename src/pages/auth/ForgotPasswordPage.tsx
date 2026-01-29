import { ForgotPasswordForm } from '@/modules/auth/ui';

import { usePageMetadata } from '@/libs/usePageMetadata';

export const ForgotPasswordPage = () => {
  usePageMetadata({ title: 'Forgot Password' });

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <h1 className="text-display-sm font-semibold text-primary">Forgot password?</h1>
          <p className="mt-2 text-md text-tertiary">
            No worries, we&apos;ll send you reset instructions.
          </p>
        </div>

        <ForgotPasswordForm />
      </div>
    </div>
  );
};
