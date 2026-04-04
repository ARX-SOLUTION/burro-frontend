import type { Key } from 'react-aria-components';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Key01, Mail01, User01 } from '@untitledui/icons';

import { Tab, TabList, Tabs } from '@/components/application/tabs/tabs';
import { Breadcrumb } from '@/components/base/breadcrumb/breadcrumb';
import { useBreakpoint } from '@/hooks/use-breakpoint';
import { PageContent, PageHeader, PageWrapper } from '@/layouts/DashboardLayout';

const tabItems = [
  { id: 'profile', label: 'Profile', icon: User01 },
  { id: 'email', label: 'Email', icon: Mail01 },
  { id: 'security', label: 'Security', icon: Key01 },
];

export const SettingsLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isDesktop = useBreakpoint('lg');

  const currentTab = location.pathname.split('/').pop() || 'profile';

  const handleSelectionChange = (key: Key) => {
    navigate(`/dashboard/settings/${key}`);
  };

  return (
    <PageWrapper>
      <PageHeader>
        <Breadcrumb items={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Settings' }]} />
      </PageHeader>

      <PageContent>
        <div className="mb-8 flex flex-col gap-0.5 lg:gap-1">
          <h1 className="text-xl font-semibold text-primary lg:text-display-xs">Settings</h1>
          <p className="text-md text-tertiary">Manage your account settings and preferences.</p>
        </div>

        <Tabs
          orientation={isDesktop ? 'vertical' : 'horizontal'}
          selectedKey={currentTab}
          onSelectionChange={handleSelectionChange}
          className="flex flex-col gap-6 lg:flex-row lg:gap-12"
        >
          <aside className="shrink-0 lg:w-48">
            <TabList items={tabItems} type={isDesktop ? 'line' : 'underline'} size="md">
              {(item) => (
                <Tab key={item.id} id={item.id} icon={item.icon}>
                  <item.icon className="size-5" />
                  {item.label}
                </Tab>
              )}
            </TabList>
          </aside>
          <main className="flex-1">
            <Outlet />
          </main>
        </Tabs>
      </PageContent>
    </PageWrapper>
  );
};
