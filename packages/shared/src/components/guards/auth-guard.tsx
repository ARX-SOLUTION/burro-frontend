import { Navigate, useLocation } from 'react-router-dom';

import { PageLoading } from '@burro/shared/components/page-loading';
import { useAuth } from '@burro/shared/hooks/use-auth';

type AuthGuardProps = {
  children: React.ReactNode;
};

export const AuthGuard = ({ children }: AuthGuardProps) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <PageLoading />;
  }

  if (!isAuthenticated) {
    const redirectUrl = `${location.pathname}${location.search}`;
    return <Navigate to={`/auth/login?redirect=${encodeURIComponent(redirectUrl)}`} replace />;
  }

  return <>{children}</>;
};
