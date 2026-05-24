import { FC, ReactNode } from 'react';
import { ChevronRight } from '@untitledui/icons';

import { Button } from '@burro/shared/components/base/buttons/button';
import { cx } from '@burro/shared/utils/cx';

export interface BreadcrumbItem {
  /** The label text for the breadcrumb item */
  label: ReactNode;
  /** Optional href to make the item a link */
  href?: string;
  /** Optional className for custom styling */
  className?: string;
}

export interface BreadcrumbProps {
  /** Array of breadcrumb items */
  items: BreadcrumbItem[];
  /** Optional className for the breadcrumb container */
  className?: string;
  /** Optional separator icon component (defaults to ChevronRight) */
  separator?: FC<{ className?: string }>;
  /** Optional className for the separator */
  separatorClassName?: string;
}

export const Breadcrumb: FC<BreadcrumbProps> = ({
  items,
  className,
  separator: Separator = ChevronRight,
  separatorClassName,
}) => {
  return (
    <nav
      aria-label="Breadcrumb"
      className={cx('flex items-center gap-2 text-sm text-utility-gray-600', className)}
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <div key={index} className="flex items-center gap-2">
            {item.href ? (
              <Button href={item.href} color="link-gray" className={item.className}>
                {item.label}
              </Button>
            ) : (
              <span className={cx('font-medium text-utility-brand-600', item.className)}>
                {item.label}
              </span>
            )}
            {!isLast && (
              <span aria-hidden="true">
                <Separator className={cx('size-4', separatorClassName)} />
              </span>
            )}
          </div>
        );
      })}
    </nav>
  );
};
