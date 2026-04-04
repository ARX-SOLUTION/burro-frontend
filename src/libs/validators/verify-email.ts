import { z } from 'zod';

export const verifyEmailSchema = z.object({
  token: z
    .string({ error: 'Verification code is required' })
    .length(6, { error: 'Verification code must be 6 digits' })
    .regex(/^\d+$/, { error: 'Verification code must contain only numbers' }),
});

export type VerifyEmailFormData = z.infer<typeof verifyEmailSchema>;
