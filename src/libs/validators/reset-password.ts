import { z } from 'zod';

export const resetPasswordSchema = z
  .object({
    password: z
      .string({ error: 'Password is required' })
      .min(8, { error: 'Password must be at least 8 characters' }),
    confirmPassword: z.string({ error: 'Please confirm your password' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
