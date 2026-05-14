import { Suspense } from 'react'
import { RouterProvider } from 'react-router'

import QueryProvider from './app/providers/query-provider'
import { router } from '@shared/router/router'

const App = () => {
  return (
    <QueryProvider>
      <Suspense fallback={null}>
        <RouterProvider router={router} />
      </Suspense>
    </QueryProvider>
  )
}

export default App
