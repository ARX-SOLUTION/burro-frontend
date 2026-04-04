import { z } from 'zod';

export const verifyEmailChangeSchema = z.object({
  code: z.string().length(6, 'Code must be 6 digits'),
});

export type VerifyEmailChangeFormData = z.infer<typeof verifyEmailChangeSchema>;
