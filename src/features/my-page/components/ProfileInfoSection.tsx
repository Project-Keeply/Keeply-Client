import useRouteNavigation from '@shared/hooks/use-route-navigation';
import { ROUTE_PATH } from '@shared/router/path';

import { useUser } from '@/entities/user';

const ProfileInfoSection = () => {
  const { user } = useUser();
  const { handleNavigate } = useRouteNavigation();

  const handleLogoutClick = () => {
    // TODO: 로그아웃 API 연동 후 토큰/사용자 상태를 초기화한다.
    handleNavigate(ROUTE_PATH.LOGIN);
  };

  return (
    <section className="flex items-center gap-6 px-5 py-7">
      {user.profileImageUrl ? (
        <img
          src={user.profileImageUrl}
          alt={`${user.name} 프로필 이미지`}
          className="size-[52px] shrink-0 rounded-full object-cover"
        />
      ) : (
        <div
          aria-hidden
          className="flex size-[52px] shrink-0 items-center justify-center rounded-full bg-primary-100"
        >
          <span className="text-title2 font-bold text-primary-500">
            {user.name.charAt(0)}
          </span>
        </div>
      )}

      <div className="min-w-0 flex-1">
        <p className="truncate text-title1 font-bold text-black">
          {user.name}
        </p>
        
        /// TODO: groupName 대기
        {/* <p className="mt-2.5 truncate text-body2 text-gray-300">
          {user.storeName}
        </p> */}
      </div>

      <button
        type="button"
        className="shrink-0 cursor-pointer text-label2 font-medium text-gray-300"
        onClick={handleLogoutClick}
      >
        로그아웃
      </button>
    </section>
  );
};

export default ProfileInfoSection;
