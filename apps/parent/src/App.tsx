import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import { PageLoading } from '@burro/shared/components/page-loading';
import { AuthProvider } from '@burro/shared/contexts/auth-context';
import { QueryProvider, ThemeProvider, ToastProvider } from '@burro/shared/providers';
import { router } from '@/routes';

import '@burro/shared/styles/globals.css';

export const App = () => {
  return (
    <StrictMode>
      <QueryProvider>
        <ThemeProvider>
          <AuthProvider>
            <Suspense fallback={<PageLoading />}>
              <RouterProvider router={router} />
            </Suspense>
            <ToastProvider />
          </AuthProvider>
        </ThemeProvider>
      </QueryProvider>
    </StrictMode>
  );
};

if (typeof window !== 'undefined') {
  createRoot(document.getElementById('root')!).render(<App />);
}