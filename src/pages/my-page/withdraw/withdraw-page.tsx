import DetailPageLayout from '@shared/layouts/DetailPageLayout';

import { WithdrawSection } from '@/features/my-page';

const WithdrawPage = () => {
  return (
    <DetailPageLayout title="탈퇴하기">
      <WithdrawSection />
    </DetailPageLayout>
  );
};

export default WithdrawPage;
