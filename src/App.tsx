import { BrowserRouter, Route, Routes } from 'react-router'

import AppShell from './layouts/AppShell'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppShell />}>
          <Route index element={<div>홈</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
