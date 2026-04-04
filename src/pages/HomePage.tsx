import { Link } from 'react-router-dom';
import { ArrowRight, Monitor02, Moon01, Sun } from '@untitledui/icons';

import { Button } from '@/components/base/buttons/button';
import { useAuth } from '@/hooks/use-auth';
import { usePageMetadata } from '@/libs/usePageMetadata';
import { useTheme } from '@/providers/theme-provider';

const ThemeIcons = {
  system: Monitor02,
  light: Sun,
  dark: Moon01,
};

export const HomePage = () => {
  usePageMetadata({ title: 'Home' });
  const { isAuthenticated, isLoading, user } = useAuth();
  const { theme, cycleTheme } = useTheme();

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-primary px-6 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link to="/" className="text-xl font-semibold text-primary">
            Template
          </Link>

          <nav className="flex items-center gap-3">
            <Button
              color="tertiary"
              size="sm"
              onClick={cycleTheme}
              iconLeading={ThemeIcons[theme]}
            />
            {isLoading ? (
              <div className="h-10 w-24 animate-pulse rounded-lg bg-secondary" />
            ) : isAuthenticated ? (
              <Button color="primary" size="sm" href="/dashboard">
                Go to Dashboard
              </Button>
            ) : (
              <>
                <Button color="tertiary" size="sm" href="/auth/login">
                  Sign in
                </Button>
                <Button color="primary" size="sm" href="/auth/register">
                  Get started
                </Button>
              </>
            )}
          </nav>
        </div>
      </header>

      <main className="flex flex-1 flex-col items-center justify-center px-6 py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-display-lg font-semibold text-primary">React Frontend Template</h1>

          <p className="mt-6 text-xl text-tertiary">
            A production-ready template with authentication, protected routes, and a modular
            architecture built with React, Vite, TanStack Query, and Zod.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            {isLoading ? (
              <div className="h-12 w-48 animate-pulse rounded-lg bg-secondary" />
            ) : isAuthenticated ? (
              <Button color="primary" size="lg" href="/dashboard" iconTrailing={ArrowRight}>
                Continue to Dashboard
              </Button>
            ) : (
              <>
                <Button color="primary" size="lg" href="/auth/register" iconTrailing={ArrowRight}>
                  Get started
                </Button>
                <Button color="secondary" size="lg" href="/auth/login">
                  Sign in
                </Button>
              </>
            )}
          </div>

          {isAuthenticated && user && (
            <p className="mt-6 text-md text-tertiary">Welcome back, {user.fullName}!</p>
          )}
        </div>

        <div className="mx-auto mt-24 grid max-w-5xl gap-8 sm:grid-cols-3">
          <div className="rounded-xl border border-primary p-6">
            <h3 className="text-lg font-semibold text-primary">Authentication</h3>
            <p className="mt-2 text-sm text-tertiary">
              JWT-based auth with httpOnly cookies, token refresh, and middleware protection.
            </p>
          </div>

          <div className="rounded-xl border border-primary p-6">
            <h3 className="text-lg font-semibold text-primary">Modular Architecture</h3>
            <p className="mt-2 text-sm text-tertiary">
              Layered module structure with API, services, UI, and validators.
            </p>
          </div>

          <div className="rounded-xl border border-primary p-6">
            <h3 className="text-lg font-semibold text-primary">Form Components</h3>
            <p className="mt-2 text-sm text-tertiary">
              React Hook Form integrated components with Zod validation.
            </p>
          </div>
        </div>
      </main>

      <footer className="border-t border-primary px-6 py-6">
        <div className="mx-auto max-w-7xl text-center text-sm text-tertiary">
          Built with React, Vite, TanStack Query, React Hook Form, and Zod
        </div>
      </footer>
    </div>
  );
};
