import { Outlet } from 'react-router'

const AppShell = () => {
  return (
    <div className="mx-auto flex h-full max-w-[430px] flex-col bg-white pb-[env(safe-area-inset-bottom)] pt-[env(safe-area-inset-top)]">
      <header className="shrink-0">Header</header>
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
      <nav className="shrink-0">BottomNav</nav>
    </div>
  )
}

export default AppShell
