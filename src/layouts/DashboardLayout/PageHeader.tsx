import type { FC, PropsWithChildren } from 'react';

import { cx } from '@/utils/cx';

interface PageHeaderProps extends PropsWithChildren {
  className?: string;
}

export const PageHeader: FC<PageHeaderProps> = ({ children, className }) => {
  return (
    <div
      className={cx(
        'flex min-h-[64px] items-center bg-primary px-6 py-5 sm:min-h-[76px]',
        className,
      )}
    >
      {children}
    </div>
  );
};
