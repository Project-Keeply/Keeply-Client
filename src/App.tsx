import { Suspense } from 'react';
import { router } from '@shared/router/router';
import { RouterProvider } from 'react-router';
import { Toaster } from 'sonner';

import QueryProvider from './app/providers/query-provider';

const App = () => {
  return (
    <QueryProvider>
      <Suspense fallback={null}>
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
