import { CommonHeader } from '@shared/components';

const TermsPage = () => {
  return (
    <div className="mx-auto flex h-[100dvh] max-w-[430px] flex-col bg-white pb-[env(safe-area-inset-bottom)] pl-[env(safe-area-inset-left)] pr-[env(safe-area-inset-right)] pt-[env(safe-area-inset-top)]">
      <CommonHeader title="약관 및 정책" showBack />
    </div>
  );
};

export default TermsPage;
