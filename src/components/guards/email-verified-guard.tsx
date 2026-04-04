import { Navigate, useLocation } from 'react-router-dom';

import { useAuth } from '@/hooks/use-auth';

type EmailVerifiedGuardProps = {
  children: React.ReactNode;
};

export const EmailVerifiedGuard = ({ children }: EmailVerifiedGuardProps) => {
  const { user } = useAuth();
  const location = useLocation();

  if (user && !user.emailVerified) {
    const redirectUrl = `${location.pathname}${location.search}`;
    return (
      <Navigate to={`/auth/verify-email?redirect=${encodeURIComponent(redirectUrl)}`} replace />
    );
  }

  return <>{children}</>;
};
