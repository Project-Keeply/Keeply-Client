import useRouteNavigation from '@shared/hooks/use-route-navigation';
import { ROUTE_PATH } from '@shared/router/path';

const USER_NAME = '홍길동';
const STORE_NAME = 'Keeply 편의점';
const KAKAO_PROFILE_IMAGE_URL = '';

const ProfileInfoSection = () => {
  const { handleNavigate } = useRouteNavigation();

  const handleLogoutClick = () => {
    // TODO: 로그아웃 API 연동 후 토큰/사용자 상태를 초기화한다.
    handleNavigate(ROUTE_PATH.LOGIN);
  };

  return (
    <section className="flex items-center gap-6 px-5 py-7">
      {KAKAO_PROFILE_IMAGE_URL ? (
        <img
          src={KAKAO_PROFILE_IMAGE_URL}
          alt={`${USER_NAME} 프로필 이미지`}
          className="size-[52px] shrink-0 rounded-full object-cover"
        />
      ) : (
        <div
          aria-hidden
          className="flex size-[52px] shrink-0 items-center justify-center rounded-full bg-primary-100"
        >
          <span className="text-title2 font-bold text-primary-500">
            {USER_NAME.charAt(0)}
          </span>
        </div>
      )}

      <div className="min-w-0 flex-1">
        <p className="truncate text-title1 font-bold text-black">{USER_NAME}</p>
        <p className="mt-2.5 truncate text-body2 text-gray-300">{STORE_NAME}</p>
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
