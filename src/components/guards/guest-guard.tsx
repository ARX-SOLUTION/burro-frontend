import { Navigate, useLocation } from 'react-router-dom';

import { AUTH_SEARCH_PARAMS, getDefaultRedirectForRole } from '@/modules/auth';

import { PageLoading } from '@/components/page-loading';
import { useAuth } from '@/hooks/use-auth';

type GuestGuardProps = {
  children: React.ReactNode;
};

export const GuestGuard = ({ children }: GuestGuardProps) => {
  const { isAuthenticated, isLoading, user } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <PageLoading />;
  }

  if (isAuthenticated) {
    const redirectParam = new URLSearchParams(location.search).get(AUTH_SEARCH_PARAMS.REDIRECT);
    const fromState = (location.state as { from?: string })?.from;
    const fallbackRedirect = getDefaultRedirectForRole(user?.role);
    const redirectUrl = redirectParam || fromState || fallbackRedirect;

    if (user && !user.emailVerified) {
      return (
        <Navigate to={`/auth/verify-email?redirect=${encodeURIComponent(redirectUrl)}`} replace />
      );
    }

    return <Navigate to={redirectUrl} replace />;
  }

  return <>{children}</>;
};
