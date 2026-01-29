import type { Role } from '@/modules/auth';

export type User = {
  id: string;
  email: string;
  fullName: string;
  role: Role;
  emailVerified: boolean;
  createdAt: string;
};
