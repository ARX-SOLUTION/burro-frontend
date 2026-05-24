import type { ReactNode } from 'react';
import { QueryErrorResetBoundary } from '@tanstack/react-query';

import { ErrorBoundary, ErrorFallback } from './error-boundary';

interface QueryErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export const QueryErrorBoundary = ({ children, fallback }: QueryErrorBoundaryProps) => (
  <QueryErrorResetBoundary>
    {({ reset }) => (
      <ErrorBoundary onReset={reset} fallback={fallback}>
        {children}
      </ErrorBoundary>
    )}
  </QueryErrorResetBoundary>
);

interface QueryErrorFallbackProps {
  error?: Error | null;
  onReset?: () => void;
}

export const QueryErrorFallback = ({ error, onReset }: QueryErrorFallbackProps) => (
  <ErrorFallback
    error={error}
    onReset={onReset}
    title="Failed to load data"
    description="We couldn't load the data. Please check your connection and try again."
  />
);
