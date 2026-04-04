import { Component, type ErrorInfo, type ReactNode } from 'react';
import { AlertTriangle, RefreshCcw01 } from '@untitledui/icons';

import { Button } from '@/components/base/buttons/button';

import { EmptyState } from '../empty-state/empty-state';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  onReset?: () => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.props.onError?.(error, errorInfo);
  }

  handleReset = (): void => {
    this.setState({ hasError: false, error: null });
    this.props.onReset?.();
  };

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return <ErrorFallback error={this.state.error} onReset={this.handleReset} />;
    }

    return this.props.children;
  }
}

interface ErrorFallbackProps {
  error?: Error | null;
  onReset?: () => void;
  title?: string;
  description?: string;
}

export const ErrorFallback = ({
  error,
  onReset,
  title = 'Something went wrong',
  description,
}: ErrorFallbackProps) => (
  <div className="flex items-center justify-center py-10">
    <EmptyState size="sm">
      <EmptyState.Header pattern="none">
        <EmptyState.FeaturedIcon color="error" icon={AlertTriangle} />
      </EmptyState.Header>
      <EmptyState.Content>
        <EmptyState.Title>{title}</EmptyState.Title>
        <EmptyState.Description>
          {description || error?.message || 'An unexpected error occurred. Please try again.'}
        </EmptyState.Description>
      </EmptyState.Content>
      {onReset && (
        <EmptyState.Footer>
          <Button color="secondary" size="md" iconLeading={RefreshCcw01} onClick={onReset}>
            Try again
          </Button>
        </EmptyState.Footer>
      )}
    </EmptyState>
  </div>
);
