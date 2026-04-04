import type { Role } from '@/modules/auth';

export type CreateUserRequest = {
  email: string;
  fullName: string;
  password: string;
  role: Role;
};
