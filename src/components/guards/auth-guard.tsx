import { Navigate, useLocation } from 'react-router-dom';

import { PageLoading } from '@/components/page-loading';
import { useAuth } from '@/hooks/use-auth';

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
    return <Navigate to="/auth/login" state={{ from: location.pathname }} replace />;
  }

  return <>{children}</>;
};
