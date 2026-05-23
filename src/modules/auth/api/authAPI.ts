import axiosInstance, { authAxiosInstance } from '@/services';

import type { AuthSuccessResponse, RefreshTokenRequest, TokensResponse } from '../types';

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

  telegramUrl: () =>
    authAxiosInstance.get<{ url: string }>(AUTH_ROUTES.telegramUrl).then((res) => res.data),

  telegramCodeLogin: (payload: { code: string }) =>
    authAxiosInstance
      .post<AuthSuccessResponse>(AUTH_ROUTES.telegramCode, payload)
      .then((res) => res.data),

  refresh: (payload: RefreshTokenRequest) =>
    authAxiosInstance.post<TokensResponse>(AUTH_ROUTES.refresh, payload).then((res) => res.data),

  logout: () => axiosInstance.post<void>(AUTH_ROUTES.logout).then((res) => res.data),
};
