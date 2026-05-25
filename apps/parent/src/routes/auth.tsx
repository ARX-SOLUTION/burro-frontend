import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';

import { GuestGuard } from '@burro/shared/components/guards';
import { AuthLayout } from '@burro/shared/layouts/auth-layout';

const LoginPage = lazy(() =>
  import('@/pages/auth/LoginPage').then((m) => ({ default: m.LoginPage })),
);
const RegisterPage = lazy(() =>
  import('@/pages/auth/RegisterPage').then((m) => ({ default: m.RegisterPage })),
);
const TelegramCallbackPage = lazy(() =>
  import('@/pages/auth/TelegramCallbackPage').then((m) => ({ default: m.TelegramCallbackPage })),
);

export const authRoutes: RouteObject[] = [
  {
    path: 'auth',
    element: (
      <GuestGuard defaultRedirect="/burro/parent">
        <AuthLayout />
      </GuestGuard>
    ),
    children: [
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'telegram/callback',
        element: <TelegramCallbackPage />,
      },
      {
        path: 'register',
        element: <RegisterPage />,
      },
    ],
  },
];
