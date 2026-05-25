import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

import { getDefaultRedirectForRole, Role } from '@burro/shared/modules/auth';

import { PageLoading } from '@burro/shared/components/page-loading';
import { useAuth } from '@burro/shared/hooks/use-auth';

type StudentGuardProps = {
  children: React.ReactNode;
  roleRedirects?: Partial<Record<Role, string>>;
};

const isExternalUrl = (value: string) => /^https?:\/\//.test(value);

const ExternalRedirect = ({ to }: { to: string }) => {
  useEffect(() => {
    window.location.replace(to);
  }, [to]);

  return <PageLoading />;
};

export const StudentGuard = ({ children, roleRedirects }: StudentGuardProps) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <PageLoading />;
  }

  if (!user) {
    return null;
  }

  if (user.role !== Role.Student) {
    const redirectUrl = roleRedirects?.[user.role] ?? getDefaultRedirectForRole(user.role);

    if (isExternalUrl(redirectUrl)) {
      return <ExternalRedirect to={redirectUrl} />;
    }

    return <Navigate to={redirectUrl} replace />;
  }

  return <>{children}</>;
};
