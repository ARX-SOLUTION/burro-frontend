import { RegisterForm } from '@/modules/auth/ui';

import { usePageMetadata } from '@/libs/usePageMetadata';

export const RegisterPage = () => {
  usePageMetadata({ title: 'Create Account' });

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <h1 className="text-display-sm font-semibold text-primary">Create an account</h1>
          <p className="mt-2 text-md text-tertiary">Get started with your free account today.</p>
        </div>

        <RegisterForm />
      </div>
    </div>
  );
};
