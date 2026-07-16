import { Suspense } from 'react';
import { LoadingScreen } from '@shared/components';
import { router } from '@shared/router/router';
import { RouterProvider } from 'react-router';
import { Toaster } from 'sonner';

import QueryProvider from './app/providers/query-provider';

const App = () => {
  return (
    <QueryProvider>
      <Suspense fallback={<LoadingScreen />}>
        <RouterProvider router={router} />
      </Suspense>
      <Toaster
        position="top-center"
        toastOptions={{ unstyled: true, classNames: { toast: 'w-full' } }}
      />
    </QueryProvider>
  );
};

export default App;
