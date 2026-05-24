import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

import { Role, useRole } from '@burro/shared/modules/auth';

import { PageLoading } from '@burro/shared/components/page-loading';

import { Button } from '../base/buttons/button';

type RoleGuardProps = {
  children: ReactNode;
  /**
   * Allowed roles (exact match)
   */
  roles?: Role[];
  /**
   * Minimum role level (hierarchy-based check)
   */
  minimumRole?: Role;
  /**
   * Custom fallback component when access is denied
   */
  fallback?: ReactNode;
  /**
   * Enable page-level mode with default fallback UI
   */
  pageLevel?: boolean;
};

const AccessDenied = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center gap-4 p-8">
      <h2 className="text-lg font-semibold">Access Denied</h2>
      <p className="text-secondary-foreground text-sm">
        You don&apos;t have permission to access this page.
      </p>
      <Button color="primary" size="md" onClick={() => navigate(-1)}>
        Go Back
      </Button>
    </div>
  );
};

export const RoleGuard = ({
  children,
  roles,
  minimumRole,
  fallback,
  pageLevel = false,
}: RoleGuardProps) => {
  const { role, isLoading, hasRole, isAtLeast } = useRole();

  if (isLoading) {
    return pageLevel ? <PageLoading /> : null;
  }

  if (!role) {
    return pageLevel ? <AccessDenied /> : null;
  }

  let hasAccess = false;

  if (roles && roles.length > 0) {
    hasAccess = hasRole(roles);
  } else if (minimumRole) {
    hasAccess = isAtLeast(minimumRole);
  }

  if (!hasAccess) {
    if (fallback) {
      return <>{fallback}</>;
    }
    return pageLevel ? <AccessDenied /> : null;
  }

  return <>{children}</>;
};
