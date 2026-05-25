import { type PropsWithChildren } from 'react';
import { RouterProvider as AriaRouterProvider } from 'react-aria-components';
import type { NavigateOptions } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

declare module 'react-aria-components' {
  interface RouterConfig {
    routerOptions: NavigateOptions;
  }
}

export const RouteProvider = ({ children }: PropsWithChildren) => {
  const navigate = useNavigate();

  return <AriaRouterProvider navigate={navigate}>{children}</AriaRouterProvider>;
};
