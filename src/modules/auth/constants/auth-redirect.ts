import { Role } from './role';

export const AUTH_SEARCH_PARAMS = {
  REDIRECT: 'redirect',
} as const;

export const DEFAULT_AUTH_REDIRECT = '/dashboard';
export const DEFAULT_STUDENT_REDIRECT = '/burro';

export const getDefaultRedirectForRole = (role: Role | null | undefined) => {
  return role === Role.Student ? DEFAULT_STUDENT_REDIRECT : DEFAULT_AUTH_REDIRECT;
};

export const buildAuthPathWithRedirect = (path: string, redirectUrl: string | null | undefined) => {
  if (!redirectUrl) {
    return path;
  }

  const searchParams = new URLSearchParams({
    [AUTH_SEARCH_PARAMS.REDIRECT]: redirectUrl,
  });

  return `${path}?${searchParams.toString()}`;
};
