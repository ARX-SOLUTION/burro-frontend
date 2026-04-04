import { ResetPasswordForm } from '@/modules/auth/ui';

import { usePageMetadata } from '@/libs/usePageMetadata';

export const ResetPasswordPage = () => {
  usePageMetadata({ title: 'Reset Password' });

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <h1 className="text-display-sm font-semibold text-primary">Set new password</h1>
          <p className="mt-2 text-md text-tertiary">
            Your new password must be different from previous passwords.
          </p>
        </div>

        <ResetPasswordForm />
      </div>
    </div>
  );
};
