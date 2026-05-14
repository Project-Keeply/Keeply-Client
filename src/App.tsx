import { BrowserRouter, Route, Routes } from 'react-router'

import AppShell from './app/layouts/AppShell'
import QueryProvider from './app/providers/query-provider'
import Home from './pages/home/home'

const App = () => {
  return (
    <QueryProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<AppShell />}>
            <Route index element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryProvider>
  )
}

export default App
