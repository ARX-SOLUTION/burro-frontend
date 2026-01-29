import { z } from 'zod';

export const requestEmailChangeSchema = z.object({
  newEmail: z.string().min(1, 'Email is required').email('Invalid email address'),
  currentPassword: z.string().min(1, 'Current password is required'),
});

export type RequestEmailChangeFormData = z.infer<typeof requestEmailChangeSchema>;
