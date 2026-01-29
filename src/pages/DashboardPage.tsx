import { Monitor02, Moon01, Sun } from '@untitledui/icons';

import { Button } from '@/components/base/buttons/button';
import { useAuth } from '@/hooks/use-auth';
import { PageContent, PageHeader, PageWrapper } from '@/layouts/DashboardLayout';
import { usePageMetadata } from '@/libs/usePageMetadata';
import { useTheme } from '@/providers/theme-provider';

const ThemeIcons = {
  system: Monitor02,
  light: Sun,
  dark: Moon01,
};

export const DashboardPage = () => {
  usePageMetadata({ title: 'Dashboard' });
  const { user } = useAuth();

  const { theme, cycleTheme } = useTheme();

  return (
    <PageWrapper>
      <PageHeader className="">
        <Button
          className="ml-auto"
          color="secondary"
          onClick={cycleTheme}
          iconLeading={ThemeIcons[theme]}
        ></Button>
      </PageHeader>
      <PageContent>
        <div>
          <h2 className="mb-4 text-2xl font-semibold text-primary">
            Welcome back, {user?.fullName}!
          </h2>
          <p className="text-gray-600">This is your dashboard. Start building your application.</p>
        </div>
      </PageContent>
    </PageWrapper>
  );
};
