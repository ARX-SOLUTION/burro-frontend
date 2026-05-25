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

type TelegramOAuthState = {
  redirect?: string;
};

const isSafeRedirectPath = (value: string | null | undefined): value is string =>
  Boolean(value && value.startsWith('/') && !value.startsWith('//'));

const decodeBase64Url = (value: string): string => {
  const base64 = value.replace(/-/g, '+').replace(/_/g, '/');
  const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), '=');
  return atob(padded);
};

export const parseTelegramOAuthState = (state: string | null | undefined) => {
  if (!state) return null;

  try {
    return JSON.parse(decodeBase64Url(state)) as TelegramOAuthState;
  } catch {
    return null;
  }
};

export const getTelegramOAuthStateRedirect = (state: string | null | undefined) => {
  const parsedState = parseTelegramOAuthState(state);
  return isSafeRedirectPath(parsedState?.redirect) ? parsedState.redirect : null;
};
