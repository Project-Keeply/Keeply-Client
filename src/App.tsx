import { Suspense } from 'react';
import { ErrorScreen, LoadingScreen } from '@shared/components';
import { router } from '@shared/router/router';
import { ErrorBoundary } from 'react-error-boundary';
import { RouterProvider } from 'react-router';
import { Toaster } from 'sonner';

import QueryProvider from './app/providers/query-provider';

const App = () => {
  return (
    <QueryProvider>
      <ErrorBoundary FallbackComponent={ErrorScreen}>
        <Suspense fallback={<LoadingScreen />}>
          <RouterProvider router={router} />
        </Suspense>
        <Toaster
          position="top-center"
          toastOptions={{ unstyled: true, classNames: { toast: 'w-full' } }}
        />
      </ErrorBoundary>
    </QueryProvider>
  );
};

export default App;
