import DetailPageLayout from '@shared/layouts/DetailPageLayout';

import { ProfileInfoSection } from '@/features/my-page';

const ProfilePage = () => {
  return (
    <DetailPageLayout title="내 정보">
      <ProfileInfoSection />
    </DetailPageLayout>
  );
};

export default ProfilePage;
