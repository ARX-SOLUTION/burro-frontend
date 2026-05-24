import { Role } from './role';

export const AUTH_SEARCH_PARAMS = {
  REDIRECT: 'redirect',
} as const;

export const DEFAULT_AUTH_REDIRECT = '/dashboard';
export const DEFAULT_STUDENT_REDIRECT = '/burro';
export const DEFAULT_PARENT_REDIRECT = '/burro/parent';

export const getDefaultRedirectForRole = (role: Role | null | undefined) => {
  if (role === Role.Student) return DEFAULT_STUDENT_REDIRECT;
  if (role === Role.Parent) return DEFAULT_PARENT_REDIRECT;
  return DEFAULT_AUTH_REDIRECT;
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
