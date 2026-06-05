import BottomNav from '@shared/components/BottomNav';
import FloatingButton from '@shared/components/FloatingButton';
import { ROUTE_PATH } from '@shared/router/path';
import { Outlet, useLocation, useNavigate } from 'react-router';

const FLOATING_BUTTON_MAP: Partial<Record<string, string>> = {
  [ROUTE_PATH.HOME]: ROUTE_PATH.ANNOUNCEMENT_WRITE,
  [ROUTE_PATH.WORKING_SPACE]: ROUTE_PATH.WORKING_SPACE_WRITE,
  [ROUTE_PATH.MANAGEMENT]: ROUTE_PATH.MANAGEMENT_WRITE,
};

const AppShell = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const writeRoute = FLOATING_BUTTON_MAP[pathname];

  const handleFloatingButtonClick = () => {
    navigate(writeRoute!);
  };

  return (
    <div className="mx-auto flex min-h-screen min-h-[100dvh] max-w-[430px] flex-col bg-white pb-[env(safe-area-inset-bottom)] pl-[env(safe-area-inset-left)] pr-[env(safe-area-inset-right)] pt-[env(safe-area-inset-top)]">
      <main className="flex flex-1 flex-col overflow-y-auto">
        <Outlet />
      </main>
      <div className="shrink-0">
        <BottomNav />
      </div>
      {writeRoute && <FloatingButton onClick={handleFloatingButtonClick} />}
    </div>
  );
};

export default AppShell;
