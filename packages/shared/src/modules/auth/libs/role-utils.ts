import { ALLOWED_LOGIN_ROLES, Role, ROLE_HIERARCHY } from '../constants';

/**
 * Check if a role has at least the minimum required permission level
 */
export const isAtLeast = (userRole: Role, minimumRole: Role): boolean => {
  return ROLE_HIERARCHY[userRole] >= ROLE_HIERARCHY[minimumRole];
};

/**
 * Check if a role is included in the allowed roles list
 */
export const hasRole = (userRole: Role, allowedRoles: Role[]): boolean => {
  return allowedRoles.includes(userRole);
};

/**
 * Check if a role is allowed to login to the application
 */
export const canLogin = (role: Role): boolean => {
  return ALLOWED_LOGIN_ROLES.includes(role);
};
