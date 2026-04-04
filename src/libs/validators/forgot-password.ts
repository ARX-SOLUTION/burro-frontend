import { z } from 'zod';

export const forgotPasswordSchema = z.object({
  email: z
    .string({ error: 'Email is required' })
    .email({ error: 'Email must be a valid email address' }),
});

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
