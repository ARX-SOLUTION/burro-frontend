import { Navigate } from 'react-router-dom';

import { getDefaultRedirectForRole, Role } from '@burro/shared/modules/auth';

import { PageLoading } from '@burro/shared/components/page-loading';
import { useAuth } from '@burro/shared/hooks/use-auth';

type ParentGuardProps = {
  children: React.ReactNode;
};

export const ParentGuard = ({ children }: ParentGuardProps) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <PageLoading />;
  }

  if (!user) {
    return null;
  }

  if (user.role !== Role.Parent) {
    return <Navigate to={getDefaultRedirectForRole(user.role)} replace />;
  }

  return <>{children}</>;
};
