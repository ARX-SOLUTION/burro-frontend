import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';

import { AuthGuard, GuestGuard } from '@/components/guards';
import { AuthLayout } from '@/layouts/auth-layout';

const LoginPage = lazy(() =>
  import('@/pages/auth/LoginPage').then((m) => ({ default: m.LoginPage })),
);
const RegisterPage = lazy(() =>
  import('@/pages/auth/RegisterPage').then((m) => ({ default: m.RegisterPage })),
);
const ForgotPasswordPage = lazy(() =>
  import('@/pages/auth/ForgotPasswordPage').then((m) => ({ default: m.ForgotPasswordPage })),
);
const ResetPasswordPage = lazy(() =>
  import('@/pages/auth/ResetPasswordPage').then((m) => ({ default: m.ResetPasswordPage })),
);
const VerifyEmailPage = lazy(() =>
  import('@/pages/auth/VerifyEmailPage').then((m) => ({ default: m.VerifyEmailPage })),
);

export const authRoutes: RouteObject[] = [
  {
    path: 'auth',
    element: (
      <GuestGuard>
        <AuthLayout />
      </GuestGuard>
    ),
    children: [
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'register',
        element: <RegisterPage />,
      },
      {
        path: 'forgot-password',
        element: <ForgotPasswordPage />,
      },
      {
        path: 'reset-password',
        element: <ResetPasswordPage />,
      },
    ],
  },
  {
    path: 'auth/verify-email',
    element: (
      <AuthGuard>
        <AuthLayout />
      </AuthGuard>
    ),
    children: [
      {
        index: true,
        element: <VerifyEmailPage />,
      },
    ],
  },
];
