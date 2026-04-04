import { Role } from './role';

export const ROLE_BADGE_COLORS: Record<Role, 'brand' | 'error' | 'gray'> = {
  [Role.Superadmin]: 'error',
  [Role.Admin]: 'brand',
  [Role.Student]: 'gray',
};

export const ROLE_LABELS: Record<Role, string> = {
  [Role.Superadmin]: 'Superadmin',
  [Role.Admin]: 'Admin',
  [Role.Student]: 'Student',
};
