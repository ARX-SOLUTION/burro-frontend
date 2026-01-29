import type { FC, PropsWithChildren } from 'react';

import { cx } from '@/utils/cx';

interface PageWrapperProps extends PropsWithChildren {
  className?: string;
}

export const PageWrapper: FC<PageWrapperProps> = ({ children, className }) => {
  return <div className={cx('flex h-screen flex-col', className)}>{children}</div>;
};
