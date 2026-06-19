import { CommonHeader } from '@shared/components';

import WorkingLogList from '@/entities/working-space/components/WorkingLogList';

const WorkingSpacePage = () => {
  return (
    <>
      <CommonHeader title="근무일지" />
      <WorkingLogList logs={[]} />
    </>
  );
};

export default WorkingSpacePage;
