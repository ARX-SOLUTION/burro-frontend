import type { AuthTokens } from './AuthTokens';
import type { AuthUser } from './AuthUser';

export type AuthSuccessResponse = AuthTokens & {
  user: AuthUser;
};
