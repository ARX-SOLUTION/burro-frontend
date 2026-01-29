import { Navigate, useLocation } from 'react-router-dom';

import { PageLoading } from '@/components/page-loading';
import { useAuth } from '@/hooks/use-auth';

type GuestGuardProps = {
  children: React.ReactNode;
};

export const GuestGuard = ({ children }: GuestGuardProps) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <PageLoading />;
  }

  if (isAuthenticated) {
    const from = (location.state as { from?: string })?.from || '/dashboard';
    return <Navigate to={from} replace />;
  }

  return <>{children}</>;
};
