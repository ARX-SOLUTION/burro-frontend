import axiosInstance, { authAxiosInstance } from '@burro/shared/services';

import type { AuthSuccessResponse, RefreshTokenRequest } from '../types';
import type { AuthTokens } from '../types/AuthTokens';

const AUTH_ROUTES = {
  telegram: '/auth/telegram',
  telegramUrl: '/auth/telegram/url',
  telegramCode: '/auth/telegram/code',
  refresh: '/auth/refresh',
  logout: '/auth/logout',
} as const;

export const authAPI = {
  telegramMiniAppLogin: (initData: string) =>
    authAxiosInstance
      .post<AuthSuccessResponse>(AUTH_ROUTES.telegram, { initData })
      .then((res) => res.data),

  telegramUrl: (redirect?: string | null) =>
    authAxiosInstance
      .get<{ url: string }>(AUTH_ROUTES.telegramUrl, {
        params: redirect ? { redirect } : undefined,
      })
      .then((res) => res.data),

  telegramCodeLogin: (payload: { code: string }) =>
    authAxiosInstance
      .post<AuthSuccessResponse>(AUTH_ROUTES.telegramCode, payload)
      .then((res) => res.data),

  refresh: (payload: RefreshTokenRequest) =>
    authAxiosInstance.post<AuthTokens>(AUTH_ROUTES.refresh, payload).then((res) => res.data),

  logout: () => axiosInstance.post<void>(AUTH_ROUTES.logout).then((res) => res.data),
};
