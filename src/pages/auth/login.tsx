import { LoginForm } from '@/modules/auth/ui';

export const LoginPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <h1 className="text-display-sm font-semibold text-primary">Welcome back</h1>
          <p className="mt-2 text-md text-tertiary">Sign in to your account to continue.</p>
        </div>

        <LoginForm />
      </div>
    </div>
  );
};
