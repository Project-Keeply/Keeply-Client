import { InviteCodeCard, useMyGroup } from '@/entities/group';
import DetailPageLayout from '@/shared/layouts/DetailPageLayout';

const InvitePage = () => {
  const { group } = useMyGroup();
  return (
    <DetailPageLayout title="가입코드">
      <InviteCodeCard inviteCode={group.inviteCode ?? ''} />
    </DetailPageLayout>
  );
};

export default InvitePage;
