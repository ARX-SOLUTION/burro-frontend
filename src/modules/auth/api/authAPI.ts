import axiosInstance, { authAxiosInstance } from '@/services';

import type {
  AuthSuccessResponse,
  ForgotPasswordRequest,
  MessageResponse,
  RefreshTokenRequest,
  ResetPasswordRequest,
  SigninRequest,
  SignupRequest,
  TokensResponse,
  VerifyEmailRequest,
} from '../types';

const AUTH_ROUTES = {
  signup: '/auth/signup',
  signin: '/auth/signin',
  refresh: '/auth/refresh',
  logout: '/auth/logout',
  forgotPassword: '/auth/forgot-password',
  resetPassword: '/auth/reset-password',
  verifyEmail: '/auth/verify-email',
  resendVerification: '/auth/resend-verification',
} as const;

export const authAPI = {
  signup: (payload: SignupRequest) =>
    authAxiosInstance
      .post<AuthSuccessResponse>(AUTH_ROUTES.signup, payload)
      .then((res) => res.data),

  signin: (payload: SigninRequest) =>
    authAxiosInstance
      .post<AuthSuccessResponse>(AUTH_ROUTES.signin, payload)
      .then((res) => res.data),

  refresh: (payload: RefreshTokenRequest) =>
    authAxiosInstance.post<TokensResponse>(AUTH_ROUTES.refresh, payload).then((res) => res.data),

  logout: () => axiosInstance.post<void>(AUTH_ROUTES.logout).then((res) => res.data),

  forgotPassword: (payload: ForgotPasswordRequest) =>
    authAxiosInstance
      .post<MessageResponse>(AUTH_ROUTES.forgotPassword, payload)
      .then((res) => res.data),

  resetPassword: (payload: ResetPasswordRequest) =>
    authAxiosInstance
      .post<MessageResponse>(AUTH_ROUTES.resetPassword, payload)
      .then((res) => res.data),

  verifyEmail: (payload: VerifyEmailRequest) =>
    authAxiosInstance
      .post<MessageResponse>(AUTH_ROUTES.verifyEmail, payload)
      .then((res) => res.data),

  resendVerification: (email: string) =>
    authAxiosInstance
      .post<MessageResponse>(`${AUTH_ROUTES.resendVerification}?email=${encodeURIComponent(email)}`)
      .then((res) => res.data),
};
