import { Role } from '../constants';

export type AuthUser = {
  id: string;
  email: string;
  fullName: string;
  role: Role;
  emailVerified: boolean;
  createdAt: string;
};
