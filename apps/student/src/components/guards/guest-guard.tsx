import { Navigate, useLocation } from 'react-router-dom';

import { AUTH_SEARCH_PARAMS, getDefaultRedirectForRole } from '@burro/shared/modules/auth';

import { PageLoading } from '@burro/shared/components/page-loading';
import { useAuth } from '@burro/shared/hooks/use-auth';

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

    return <Navigate to={redirectUrl} replace />;
  }

  return <>{children}</>;
};
