import { Button, Input } from '@shared/components';
import useRouteNavigation from '@shared/hooks/use-route-navigation';
import { ROUTE_PATH } from '@shared/router/path';

const USER_NAME = '홍길동';
const STORE_NAME = 'Keeply 편의점';

const ProfileInfoSection = () => {
  const { handleNavigate } = useRouteNavigation();

  const handleLogoutClick = () => {
    // TODO: 로그아웃 API 연동 후 토큰/사용자 상태를 초기화한다.
    handleNavigate(ROUTE_PATH.LOGIN);
  };

  return (
    <section className="flex h-full flex-col justify-between py-6">
      <div>
        <div className="space-y-8">
          <label className="block">
            <span className="text-body4 font-medium text-gray-500">이름</span>
            <Input
              value={USER_NAME}
              size="md"
              disabled
              className="mt-2 border-b-0"
              inputClassName="text-gray-900"
            />
          </label>

          <div>
            <span className="text-body4 font-medium text-gray-500">
              매장 이름
            </span>
            <p className="mt-2 text-title3 font-normal text-gray-900">
              {STORE_NAME}
            </p>
          </div>
        </div>
      </div>

      <div className="pt-8">
        <Button
          variant="secondary"
          size="large"
          className="w-full"
          onClick={handleLogoutClick}
        >
          로그아웃
        </Button>
      </div>
    </section>
  );
};

export default ProfileInfoSection;
