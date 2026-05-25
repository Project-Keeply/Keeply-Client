import { Outlet } from 'react-router'

const AppShell = () => {
  return (
    <div className="mx-auto flex min-h-screen min-h-[100dvh] max-w-[430px] flex-col bg-white pb-[env(safe-area-inset-bottom)] pl-[env(safe-area-inset-left)] pr-[env(safe-area-inset-right)] pt-[env(safe-area-inset-top)]">
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
      <nav className="shrink-0">BottomNav</nav>
    </div>
  )
}

export default AppShell
