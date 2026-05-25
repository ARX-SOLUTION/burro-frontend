import { createBrowserRouter } from 'react-router-dom';

import { RootLayout } from '@burro/shared/layouts/root-layout';

import { authRoutes } from './auth';
import { dashboardRoutes } from './dashboard';
import { publicRoutes } from './public';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [...publicRoutes, ...authRoutes, ...dashboardRoutes],
  },
]);
