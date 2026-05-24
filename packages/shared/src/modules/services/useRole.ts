import { useUserProfile } from '@burro/shared/modules/users';

import { Role, ROLE_HIERARCHY } from '../constants';

export const useRole = () => {
  const { data: user, isLoading } = useUserProfile();

  const role = user?.role ?? null;

  const hasRole = (allowedRoles: Role[]): boolean => {
    if (!role) return false;
    return allowedRoles.includes(role);
  };

  const isAtLeast = (minimumRole: Role): boolean => {
    if (!role) return false;
    return ROLE_HIERARCHY[role] >= ROLE_HIERARCHY[minimumRole];
  };

  return {
    role,
    isLoading,
    hasRole,
    isAtLeast,
  };
};
