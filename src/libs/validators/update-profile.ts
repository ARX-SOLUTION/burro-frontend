import { z } from 'zod';

export const updateProfileSchema = z.object({
  fullName: z
    .string({ error: 'Full name is required' })
    .min(2, { error: 'Full name must be at least 2 characters' }),
});

export type UpdateProfileFormData = z.infer<typeof updateProfileSchema>;
