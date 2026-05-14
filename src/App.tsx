import { Suspense } from 'react'
import { router } from '@shared/router/router'
import { RouterProvider } from 'react-router'

import QueryProvider from './app/providers/query-provider'

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
