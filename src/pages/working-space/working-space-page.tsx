import { CommonHeader } from '@shared/components';
import WorkingLog from '@/entities/working-space/components/WorkingLog';

const WorkingSpacePage = () => {
  return (
    <>
      <CommonHeader title="근무일지" />
      <WorkingLog
        tag="훈진"
        content="근무일지근무일지근무일지근무일지근무일지근무일지근무일지근무일지근무일지근무일지근무일지근무일지근무일지근무일지근무일지"
      />
    </>
  );
};

export default WorkingSpacePage;
