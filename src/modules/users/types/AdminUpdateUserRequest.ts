import type { Role } from '@/modules/auth';

export type AdminUpdateUserRequest = {
  fullName?: string;
  role?: Role;
};
