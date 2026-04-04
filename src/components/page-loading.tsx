import { LoadingIndicator } from './application/loading-indicator/loading-indicator';

export const PageLoading = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <LoadingIndicator size="lg" />
    </div>
  );
};
