export enum Role {
  Superadmin = 'superadmin',
  Admin = 'admin',
  Student = 'student',
  Parent = 'parent',
}

/**
 * Role hierarchy levels (higher = more permissions)
 */
export const ROLE_HIERARCHY: Record<Role, number> = {
  [Role.Superadmin]: 4,
  [Role.Admin]: 3,
  [Role.Parent]: 2,
  [Role.Student]: 1,
};

/**
 * Roles that are allowed to access the application
 */
export const ALLOWED_LOGIN_ROLES: Role[] = [Role.Superadmin, Role.Admin, Role.Student, Role.Parent];
