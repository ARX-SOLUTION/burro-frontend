import { Role } from '../constants';

export type AuthUser = {
  id: string;
  fullName: string;
  role: Role;
  createdAt: string;
};
