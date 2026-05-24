import type { Role } from '@/modules/auth';

import type { AppLanguage } from './User';

export type AdminUpdateUserRequest = {
  fullName?: string;
  role?: Role;
  phone?: string;
  language?: AppLanguage;
  notificationsEnabled?: boolean;
  isActive?: boolean;
};
