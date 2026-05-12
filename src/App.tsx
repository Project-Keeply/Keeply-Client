import { BrowserRouter, Route, Routes } from 'react-router'

import AppShell from './app/layouts/AppShell'
import Home from './pages/home/home'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppShell />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
