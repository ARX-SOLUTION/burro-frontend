import { expect, test, type Page } from '@playwright/test';

const adminProfile = {
  id: 'admin-1',
  email: 'admin@example.com',
  fullName: 'Admin User',
  role: 'admin',
  emailVerified: true,
  createdAt: '2026-04-01T10:00:00.000Z',
};

const dashboardOverviewResponse = {
  total_students: 24,
  active_today: 9,
  total_modules: 6,
  modules_stats: [
    {
      id: 'module-1',
      titleUz: 'Alif va Ba',
    },
    {
      id: 'module-2',
      titleUz: 'Ta va Sa',
    },
  ],
};

const dashboardRankingResponse = {
  period: 'weekly',
  ranking: [
    {
      rank: 1,
      full_name: 'Aziz Karimov',
      xp: 220,
    },
    {
      rank: 2,
      full_name: 'Zilola',
      xp: 180,
    },
  ],
};

const usersResponse = {
  data: [
    {
      id: 'student-1',
      email: 'student@example.com',
      fullName: 'Aziz Karimov',
      role: 'student',
      emailVerified: true,
      createdAt: '2026-04-01T10:00:00.000Z',
    },
    {
      id: 'student-2',
      email: 'zilola@example.com',
      fullName: 'Zilola',
      role: 'student',
      emailVerified: false,
      createdAt: '2026-04-02T10:00:00.000Z',
    },
  ],
  meta: {
    total: 2,
    page: 1,
    limit: 10,
    totalPages: 1,
    hasNextPage: false,
    hasPreviousPage: false,
  },
};

const errorResponse = {
  error: {
    code: 'INTERNAL_ERROR',
    message: 'Server error',
    timestamp: '2026-04-04T10:00:00.000Z',
    path: '/api/users',
  },
};

const mockAdminSession = async (page: Page) => {
  await page.addInitScript(() => {
    localStorage.setItem('access_token', 'admin-access-token');
    localStorage.setItem('refresh_token', 'admin-refresh-token');
  });

  await page.route('**/api/users/me', async (route) => {
    await route.fulfill({ json: adminProfile });
  });
};

test('admin dashboard loads overview and XP ranking from backend-shaped data', async ({ page }) => {
  await mockAdminSession(page);

  await page.route('**/api/admin/reports/overview', async (route) => {
    await route.fulfill({ json: dashboardOverviewResponse });
  });

  await page.route('**/api/admin/reports/xp-ranking**', async (route) => {
    await route.fulfill({ json: dashboardRankingResponse });
  });

  await page.goto('/dashboard');

  await expect(page.getByRole('heading', { name: 'Admin User' })).toBeVisible();
  await expect(page.getByText('Active students')).toBeVisible();
  await expect(page.getByText('24')).toBeVisible();
  await expect(page.getByText('Active today')).toBeVisible();
  await expect(page.getByText('9')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Top XP ranking' })).toBeVisible();
  await expect(page.getByText('Aziz Karimov')).toBeVisible();
  await expect(page.getByText('220 XP')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Published modules' })).toBeVisible();
  await expect(page.getByText('Alif va Ba')).toBeVisible();
});

test('admin dashboard shows a retry state when report queries fail', async ({ page }) => {
  await mockAdminSession(page);

  await page.route('**/api/admin/reports/overview', async (route) => {
    await route.fulfill({ status: 500, json: errorResponse });
  });

  await page.route('**/api/admin/reports/xp-ranking**', async (route) => {
    await route.fulfill({ status: 500, json: errorResponse });
  });

  await page.goto('/dashboard');

  await expect(page.getByText('Server error')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Retry' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Open users' })).toBeVisible();
});

test('guest users are redirected to login from the dashboard area', async ({ page }) => {
  await page.goto('/dashboard');

  await expect(page).toHaveURL(/\/auth\/login\?redirect=%2Fdashboard$/);
});

test('admin users can load the dashboard users table from backend-shaped data', async ({
  page,
}) => {
  await mockAdminSession(page);

  await page.route('**/api/users?*', async (route) => {
    await route.fulfill({ json: usersResponse });
  });

  await page.goto('/dashboard/users');

  await expect(page.getByRole('heading', { name: 'Users List' })).toBeVisible();
  await expect(page.getByText('Aziz Karimov')).toBeVisible();
  await expect(page.getByText('student@example.com')).toBeVisible();
  await expect(page.getByText('Zilola', { exact: true })).toBeVisible();
  await expect(page.getByText('No users found')).toHaveCount(0);
});

test.fixme('dashboard users page fails safely when the users query errors', async ({ page }) => {
  await mockAdminSession(page);

  await page.route('**/api/users?*', async (route) => {
    await route.fulfill({ status: 500, json: errorResponse });
  });

  await page.goto('/dashboard/users');

  await expect(page.getByText('Failed to load data')).toBeVisible();
  await expect(
    page.getByText("We couldn't load the data. Please check your connection and try again."),
  ).toBeVisible();
  await expect(page.getByRole('button', { name: 'Try again' })).toBeVisible();
});
