import { CommonHeader } from '@shared/components';

const ProfilePage = () => {
  return (
    <div className="mx-auto flex h-[100dvh] max-w-[430px] flex-col bg-white pb-[env(safe-area-inset-bottom)] pl-[env(safe-area-inset-left)] pr-[env(safe-area-inset-right)] pt-[env(safe-area-inset-top)]">
      <CommonHeader title="내 정보" showBack />
    </div>
  );
};

export default ProfilePage;
