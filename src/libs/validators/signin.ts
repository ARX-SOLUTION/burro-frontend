import { z } from 'zod';

export const signinSchema = z.object({
  email: z
    .string({ error: 'Email is required' })
    .email({ error: 'Email must be a valid email address' }),
  password: z.string({ error: 'Password is required' }),
});

export type SigninFormData = z.infer<typeof signinSchema>;
