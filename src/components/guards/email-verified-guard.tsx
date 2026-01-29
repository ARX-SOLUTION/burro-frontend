import { Navigate } from 'react-router-dom';

import { useAuth } from '@/hooks/use-auth';

type EmailVerifiedGuardProps = {
  children: React.ReactNode;
};

export const EmailVerifiedGuard = ({ children }: EmailVerifiedGuardProps) => {
  const { user } = useAuth();

  if (user && !user.emailVerified) {
    return <Navigate to="/auth/verify-email" replace />;
  }

  return <>{children}</>;
};
