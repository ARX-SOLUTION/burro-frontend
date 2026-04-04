import { z } from 'zod';

export const changePasswordSchema = z
  .object({
    currentPassword: z
      .string({ error: 'Current password is required' })
      .min(1, { error: 'Current password is required' }),
    newPassword: z
      .string({ error: 'New password is required' })
      .min(8, { error: 'New password must be at least 8 characters' }),
    confirmPassword: z.string({ error: 'Please confirm your new password' }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    error: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;
