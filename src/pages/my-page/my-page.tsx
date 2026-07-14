import { CommonHeader, MenuRow } from '@shared/components';
import useRouteNavigation from '@shared/hooks/use-route-navigation';

import { MYPAGE_MENUS } from './config/menus';

import { useMyGroup } from '@/entities/group';
import { ProfileInfoSection } from '@/features/my-page';

const MyPage = () => {
  const { handleNavigate } = useRouteNavigation();
  const { group } = useMyGroup();

  const isOwner = group.role === 'OWNER';
  const visibleMenus = MYPAGE_MENUS.filter(({ ownerOnly }) => !ownerOnly || isOwner,)

  return (
    <>
      <CommonHeader title="마이페이지" isSticky />
      <ProfileInfoSection />
      <hr className="h-[10px] border-0 bg-lightgray" />
      <nav className="divide-y divide-gray-100">
        {visibleMenus.map(({ label, path }) => (
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
