import type { FC, PropsWithChildren } from 'react';

import { cx } from '@burro/shared/utils/cx';

interface PageContentProps extends PropsWithChildren {
  className?: string;
}

export const PageContent: FC<PageContentProps> = ({ children, className }) => {
  return <div className={cx('grow overflow-y-auto p-6', className)}>{children}</div>;
};
