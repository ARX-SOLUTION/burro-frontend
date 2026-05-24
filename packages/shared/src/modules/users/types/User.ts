import type { Role } from '@burro/shared/modules/auth';

export type AppLanguage = 'uz' | 'en' | 'ru' | 'ar';

export type User = {
  id: string;
  email: string | null;
  fullName: string;
  phone: string | null;
  role: Role;
  emailVerified: boolean;
  language: AppLanguage;
  avatarUrl: string | null;
  telegramId: string | null;
  telegramUsername: string | null;
  telegramPhotoUrl: string | null;
  username: string | null;
  notificationsEnabled: boolean;
  telegramLinkedAt: string | null;
  isActive: boolean;
  lastLoginAt: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
};
