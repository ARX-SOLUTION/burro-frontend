import { useLocation } from 'react-router-dom';
import { Home03, Settings01, Users01 } from '@untitledui/icons';

import { useLogoutMutation } from '@/modules/auth';

import type {
  NavItemDividerType,
  NavItemType,
} from '@/components/application/app-navigation/config';
import { SidebarNavigationSectionDividers } from '@/components/application/app-navigation/sidebar-navigation/sidebar-section-dividers';
import { cx } from '@/utils/cx';

const navItems: (NavItemType | NavItemDividerType)[] = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: Home03,
  },
  {
    label: 'Users',
    href: '/dashboard/users',
    icon: Users01,
  },
  {
    label: 'Arab tili',
    href: '/arab-tili',
    icon: Home03,
  },
  {
    divider: true,
    label: 'Settings',
  },
  {
    label: 'Settings',
    href: '/dashboard/settings',
    icon: Settings01,
  },
];

interface SidebarProps {
  className?: string;
}

export const Sidebar = ({ className }: SidebarProps) => {
  const location = useLocation();
  const { mutate: logout, isPending: isLoggingOut } = useLogoutMutation();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className={cx('max-lg:w-full!', className)}>
      <SidebarNavigationSectionDividers
        activeUrl={location.pathname}
        items={navItems}
        onLogout={handleLogout}
        isLoggingOut={isLoggingOut}
      />
    </div>
  );
};
