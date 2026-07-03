import { CommonHeader, MenuRow } from '@shared/components';
import { type Routes } from '@shared/router/path';
import { useNavigate } from 'react-router';

import { MYPAGE_MENUS } from './config/menus';

const MyPage = () => {
  const navigate = useNavigate();

  const handleMenuClick = (path: Routes) => {
    navigate(path);
  };

  return (
    <>
      <CommonHeader title="마이페이지" isSticky />
      <nav>
        {MYPAGE_MENUS.map(({ label, path }) => (
          <MenuRow key={path} label={label} onClick={() => handleMenuClick(path)} />
        ))}
      </nav>
    </>
  );
};

export default MyPage;
