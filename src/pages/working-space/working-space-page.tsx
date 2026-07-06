import { CommonHeader } from '@shared/components';
import FloatingButton from '@shared/components/FloatingButton';

import WorkingLogList from '@/entities/working-space/components/WorkingLogList';
import { WorkingLogWriteForm, useWorkingLogWrite } from '@/features/working-space';

const WorkingSpacePage = () => {
  const { isWriting, content, isValid, openWrite, closeWrite, handleContentChange, submit } =
    useWorkingLogWrite();

  return (
    <>
      <CommonHeader title="근무일지" isSticky />
      <WorkingLogList
        logs={[]}
        writeSlot={
          isWriting && (
            <WorkingLogWriteForm
              content={content}
              isValid={isValid}
              onChange={handleContentChange}
              onSubmit={submit}
              onCancel={closeWrite}
            />
          )
        }
      />
      <FloatingButton onClick={openWrite} />
    </>
  );
};

export default WorkingSpacePage;
