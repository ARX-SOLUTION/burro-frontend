import { createQueryKeys } from '@burro/shared/modules/common';

import type { GetUsersParams } from '../api/usersAPI';

const baseKeys = createQueryKeys<GetUsersParams>('users');

export const userQueryKeys = {
  ...baseKeys,
  profile: () => [...baseKeys.all, 'profile'] as const,
};
