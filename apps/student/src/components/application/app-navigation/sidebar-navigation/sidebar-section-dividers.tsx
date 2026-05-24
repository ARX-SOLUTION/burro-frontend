import { useState } from 'react';
import {
  Button as AriaButton,
  DialogTrigger as AriaDialogTrigger,
  Popover as AriaPopover,
} from 'react-aria-components';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from '@untitledui/icons';
import { AnimatePresence, motion } from 'motion/react';

import { Avatar } from '@burro/shared/components/base/avatar/avatar';
import { ButtonUtility } from '@burro/shared/components/base/buttons/button-utility';
import { UntitledLogo } from '@burro/shared/components/foundations/logo/untitledui-logo';
import { UntitledLogoMinimal } from '@burro/shared/components/foundations/logo/untitledui-logo-minimal';
import { useAuth } from '@burro/shared/hooks/use-auth';
import { cx } from '@burro/shared/utils/cx';

import { MobileNavigationHeader } from '../base-components/mobile-header';
import { NavAccountCard, NavAccountMenu } from '../base-components/nav-account-card';
import { NavItemButton } from '../base-components/nav-item-button';
import { NavList } from '../base-components/nav-list';
import type { NavItemDividerType, NavItemType } from '../config';

const STORAGE_KEY = 'sidebar-collapsed';

interface SidebarNavigationSectionDividersProps {
  /** Width of the sidebar when expanded. */
  width?: number;
  /** URL of the currently active item. */
  activeUrl?: string;
  /** List of items to display. */
  items: (NavItemType | NavItemDividerType)[];
  /** Callback when logout is clicked. */
  onLogout?: () => void;
  /** Whether logout is in progress. */
  isLoggingOut?: boolean;
  /** URL to navigate to when logo is clicked. */
  logoHref?: string;
}

export const SidebarNavigationSectionDividers = ({
  width,
  activeUrl,
  items,
  onLogout,
  isLoggingOut,
  logoHref = '/dashboard',
}: SidebarNavigationSectionDividersProps) => {
  const { user } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(STORAGE_KEY) === 'true';
    }
    return false;
  });

  const EXPANDED_WIDTH = width ?? 280;
  const COLLAPSED_WIDTH = 68;
  const SIDEBAR_WIDTH = isCollapsed ? COLLAPSED_WIDTH : EXPANDED_WIDTH;

  const toggleCollapse = () => {
    const newValue = !isCollapsed;
    setIsCollapsed(newValue);
    localStorage.setItem(STORAGE_KEY, String(newValue));
  };

  const mobileContent = (
    <aside className="flex h-full w-full max-w-full flex-col justify-between overflow-auto border-secondary bg-primary pt-4 md:border-r lg:pt-5">
      <div className="flex flex-col gap-5 px-4 lg:px-5">
        <Link to={logoHref}>
          <UntitledLogo className="h-8" />
        </Link>
      </div>

      <NavList activeUrl={activeUrl} items={items} className="mt-5" />

      <div className="mt-auto flex flex-col gap-5 px-2 py-4 lg:gap-6 lg:px-4 lg:py-4">
        <NavAccountCard onLogout={onLogout} isLoggingOut={isLoggingOut} />
      </div>
    </aside>
  );

  return (
    <>
      {/* Mobile header navigation */}
      <MobileNavigationHeader>{mobileContent}</MobileNavigationHeader>

      {/* Desktop sidebar navigation */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-50 lg:flex lg:py-1 lg:pl-1">
        <motion.aside
          initial={false}
          animate={{ width: SIDEBAR_WIDTH }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="flex h-full max-h-full flex-col justify-between overflow-hidden bg-primary"
        >
          <div
            className={cx(
              'flex h-full w-full flex-col justify-between overflow-x-hidden overflow-y-auto rounded-xl bg-primary ring-1 ring-secondary ring-inset',
              isCollapsed ? 'pt-5' : 'pt-4 lg:pt-5',
            )}
          >
            {/* Header with logo and toggle */}
            <div
              className={cx(
                'flex flex-col gap-5',
                isCollapsed ? 'items-center px-3' : 'px-4 lg:px-5',
              )}
            >
              <div
                className={cx(
                  'flex items-center',
                  isCollapsed ? 'flex-col gap-4' : 'justify-between',
                )}
              >
                <Link to={logoHref} className="shrink-0">
                  <AnimatePresence mode="wait" initial={false}>
                    {isCollapsed ? (
                      <motion.div
                        key="minimal"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.15 }}
                      >
                        <UntitledLogoMinimal className="size-8" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="full"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.15 }}
                      >
                        <UntitledLogo className="h-8" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Link>
                <ButtonUtility
                  color="tertiary"
                  icon={isCollapsed ? ChevronRight : ChevronLeft}
                  onClick={toggleCollapse}
                ></ButtonUtility>
                {/* <button
                                    onClick={toggleCollapse}
                                    className="rounded-md p-1.5 text-fg-quaternary transition hover:bg-primary_hover hover:text-fg-quaternary_hover"
                                    aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
                                >
                                    {isCollapsed ? <ChevronRight className="size-5" /> : <ChevronLeft className="size-5" />}
                                </button> */}
              </div>
            </div>

            {/* Navigation */}
            <AnimatePresence mode="wait" initial={false}>
              {isCollapsed ? (
                <motion.ul
                  key="collapsed-nav"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="mt-4 flex flex-col gap-0.5 px-3"
                >
                  {items.map((item, index) =>
                    item.divider ? (
                      <li key={`divider-${index}`} className="my-2">
                        <div className="h-px bg-border-secondary" />
                      </li>
                    ) : item.icon ? (
                      <li key={item.label}>
                        <NavItemButton
                          size="md"
                          current={activeUrl === item.href}
                          href={item.href}
                          label={item.label}
                          icon={item.icon}
                        />
                      </li>
                    ) : null,
                  )}
                </motion.ul>
              ) : (
                <motion.div
                  key="expanded-nav"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <NavList activeUrl={activeUrl} items={items} className="mt-5" />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Footer with account */}
            <div className={cx('mt-auto', isCollapsed ? 'px-3 py-5' : 'px-2 py-4 lg:px-4')}>
              <AnimatePresence mode="wait" initial={false}>
                {isCollapsed ? (
                  <motion.div
                    key="collapsed-account"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className="flex justify-center"
                  >
                    <AriaDialogTrigger>
                      <AriaButton
                        className={({ isPressed, isFocused }) =>
                          cx(
                            'group relative inline-flex rounded-full',
                            (isPressed || isFocused) &&
                              'outline-2 outline-offset-2 outline-focus-ring',
                          )
                        }
                      >
                        <Avatar status="online" size="md" alt={user?.fullName || 'User'} />
                      </AriaButton>
                      <AriaPopover
                        placement="right bottom"
                        offset={8}
                        crossOffset={6}
                        className={({ isEntering, isExiting }) =>
                          cx(
                            'will-change-transform',
                            isEntering &&
                              'duration-300 ease-out animate-in fade-in placement-right:slide-in-from-left-2 placement-top:slide-in-from-bottom-2 placement-bottom:slide-in-from-top-2',
                            isExiting &&
                              'duration-150 ease-in animate-out fade-out placement-right:slide-out-to-left-2 placement-top:slide-out-to-bottom-2 placement-bottom:slide-out-to-top-2',
                          )
                        }
                      >
                        <NavAccountMenu onLogout={onLogout} isLoggingOut={isLoggingOut} />
                      </AriaPopover>
                    </AriaDialogTrigger>
                  </motion.div>
                ) : (
                  <motion.div
                    key="expanded-account"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <NavAccountCard onLogout={onLogout} isLoggingOut={isLoggingOut} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.aside>
      </div>

      {/* Placeholder to take up physical space because the real sidebar has `fixed` position. */}
      <motion.div
        initial={false}
        animate={{ width: SIDEBAR_WIDTH + 4 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="hidden shrink-0 lg:block"
      />
    </>
  );
};
