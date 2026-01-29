import { z } from 'zod';

export const signupSchema = z
  .object({
    fullName: z
      .string({ error: 'Full name is required' })
      .min(2, { error: 'Full name must be at least 2 characters' }),
    email: z
      .string({ error: 'Email is required' })
      .email({ error: 'Email must be a valid email address' }),
    password: z
      .string({ error: 'Password is required' })
      .min(8, { error: 'Password must be at least 8 characters' }),
    confirmPassword: z.string({
      error: 'Please confirm your password',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type SignupFormData = z.infer<typeof signupSchema>;
