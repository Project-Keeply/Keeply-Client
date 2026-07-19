import { ROUTE_PATH, type Routes } from '@shared/router/path';
import { useLocation, useNavigate } from 'react-router';

import {
  IcCart,
  IcFillCart,
  IcFillHome,
  IcFillMyPage,
  IcFillNote,
  IcHome,
  IcMyPage,
  IcNote,
} from '../icons/svgs';

interface NavItem {
  label: string;
  path: Routes;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  FillIcon: React.FC<React.SVGProps<SVGSVGElement>>;
}

const NAV_ITEMS: NavItem[] = [
  { label: '홈', path: ROUTE_PATH.HOME, Icon: IcHome, FillIcon: IcFillHome },
  { label: '근무일지', path: ROUTE_PATH.WORKING_SPACE, Icon: IcNote, FillIcon: IcFillNote },
  { label: '폐기관리', path: ROUTE_PATH.MANAGEMENT, Icon: IcCart, FillIcon: IcFillCart },
  { label: '마이페이지', path: ROUTE_PATH.MYPAGE, Icon: IcMyPage, FillIcon: IcFillMyPage },
];

const BottomNav = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="flex h-[84px] w-full items-center bg-white">
      {NAV_ITEMS.map(({ label, path, Icon, FillIcon }) => {
        const isActive = pathname === path;
        const DisplayIcon = isActive ? FillIcon : Icon;

        const handleTabClick = () => {
          navigate(path);
        };

        return (
          <button
            key={path}
            type="button"
            onClick={handleTabClick}
            className="flex flex-1 flex-col items-center justify-center gap-[4px]"
          >
            <DisplayIcon />
            <span
              className={`text-label2 font-semibold ${
                isActive ? 'text-primary-500' : 'text-gray-300'
              }`}
            >
              {label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};

export default BottomNav;
