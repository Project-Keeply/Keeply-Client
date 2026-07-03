import { CommonHeader, MenuRow } from '@shared/components';
import useRouteNavigation from '@shared/hooks/use-route-navigation';

import { MYPAGE_MENUS } from './config/menus';

const MyPage = () => {
  const { handleNavigate } = useRouteNavigation();

  return (
    <>
      <CommonHeader title="마이페이지" isSticky />
      <nav>
        {MYPAGE_MENUS.map(({ label, path }) => (
          <MenuRow
            key={path}
            label={label}
            onClick={() => handleNavigate(path)}
          />
        ))}
      </nav>
    </>
  );
};

export default MyPage;
