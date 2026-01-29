export enum Role {
  Superadmin = 'superadmin',
  Admin = 'admin',
  User = 'user',
}

/**
 * Role hierarchy levels (higher = more permissions)
 */
export const ROLE_HIERARCHY: Record<Role, number> = {
  [Role.Superadmin]: 3,
  [Role.Admin]: 2,
  [Role.User]: 1,
};

/**
 * Roles that are allowed to access the application
 */
export const ALLOWED_LOGIN_ROLES: Role[] = [Role.Superadmin, Role.Admin];
