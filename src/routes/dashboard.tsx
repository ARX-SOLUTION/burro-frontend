import { lazy } from 'react';
import { Navigate, type RouteObject } from 'react-router-dom';

import { Role } from '@/modules/auth';

import { AuthGuard, EmailVerifiedGuard, RoleGuard } from '@/components/guards';
import { DashboardLayout } from '@/layouts/DashboardLayout';
import { SettingsLayout } from '@/layouts/SettingsLayout';

const DashboardPage = lazy(() =>
  import('@/pages/DashboardPage').then((m) => ({ default: m.DashboardPage })),
);
const UsersPage = lazy(() => import('@/pages/UsersPage').then((m) => ({ default: m.UsersPage })));
const ProfileSettingsPage = lazy(() =>
  import('@/pages/settings/ProfileSettingsPage').then((m) => ({ default: m.ProfileSettingsPage })),
);
const SecuritySettingsPage = lazy(() =>
  import('@/pages/settings/SecuritySettingsPage').then((m) => ({
    default: m.SecuritySettingsPage,
  })),
);
const EmailSettingsPage = lazy(() =>
  import('@/pages/settings/EmailSettingsPage').then((m) => ({ default: m.EmailSettingsPage })),
);

export const dashboardRoutes: RouteObject[] = [
  {
    path: 'dashboard',
    element: (
      <AuthGuard>
        <EmailVerifiedGuard>
          <DashboardLayout />
        </EmailVerifiedGuard>
      </AuthGuard>
    ),
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: 'users',
        element: (
          <RoleGuard minimumRole={Role.Admin} pageLevel>
            <UsersPage />
          </RoleGuard>
        ),
      },
      {
        path: 'settings',
        element: <SettingsLayout />,
        children: [
          {
            index: true,
            element: <Navigate to="profile" replace />,
          },
          {
            path: 'profile',
            element: <ProfileSettingsPage />,
          },
          {
            path: 'email',
            element: <EmailSettingsPage />,
          },
          {
            path: 'security',
            element: <SecuritySettingsPage />,
          },
        ],
      },
    ],
  },
];
