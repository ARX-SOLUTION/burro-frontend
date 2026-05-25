import { lazy } from 'react';
import { Navigate, type RouteObject } from 'react-router-dom';

import { Role } from '@burro/shared/modules/auth';

import { AuthGuard, RoleGuard } from '@burro/shared/components/guards';
import { Button } from '@burro/shared/components/base/buttons/button';
import { DashboardLayout } from '@/layouts/DashboardLayout';
import { SettingsLayout } from '@/layouts/SettingsLayout';

const DashboardPage = lazy(() =>
  import('@/pages/DashboardPage').then((m) => ({ default: m.DashboardPage })),
);
const UsersPage = lazy(() => import('@/pages/UsersPage').then((m) => ({ default: m.UsersPage })));
const ProfileSettingsPage = lazy(() =>
  import('@/pages/settings/ProfileSettingsPage').then((m) => ({ default: m.ProfileSettingsPage })),
);

const ADMIN_ROLES = [Role.Admin, Role.Superadmin];

const AdminAccessFallback = () => (
  <div className="flex min-h-[420px] flex-col items-center justify-center gap-5 p-8 text-center">
    <div>
      <h1 className="text-xl font-semibold text-primary">Admin access only</h1>
      <p className="mt-2 max-w-md text-sm text-tertiary">
        This dashboard is only available to admin and superadmin accounts.
      </p>
    </div>
    <div className="flex flex-wrap justify-center gap-3">
      <Button href="https://student.burroarab.uz/burro" color="primary">
        Open student app
      </Button>
      <Button href="https://parent.burroarab.uz/burro/parent" color="secondary">
        Open parent app
      </Button>
    </div>
  </div>
);

export const dashboardRoutes: RouteObject[] = [
  {
    path: 'dashboard',
    element: (
      <AuthGuard>
        <RoleGuard roles={ADMIN_ROLES} pageLevel fallback={<AdminAccessFallback />}>
          <DashboardLayout />
        </RoleGuard>
      </AuthGuard>
    ),
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: 'users',
        element: <UsersPage />,
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
        ],
      },
    ],
  },
];
