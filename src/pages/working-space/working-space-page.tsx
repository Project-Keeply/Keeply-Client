import { CommonHeader } from '@shared/components';
import FloatingButton from '@shared/components/FloatingButton';

import { useMyGroup } from '@/entities/group';
import WorkingLogList from '@/entities/working-space/components/WorkingLogList';
import useWorkingLogDate from '@/entities/working-space/hooks/use-working-log-date';
import {
  useWorkingLogWrite,
  WorkingLogWriteForm,
} from '@/features/working-space';

const WorkingSpacePage = () => {
  const { groupId } = useMyGroup();
  const {
    displayDate,
    isAtMin,
    isAtMax,
    handlePrevClick: goPrevDate,
    handleNextClick: goNextDate,
    filteredLogs,
    goToToday,
  } = useWorkingLogDate(groupId);
  const {
    isWriting,
    content,
    isValid,
    openWrite,
    closeWrite,
    handleContentChange,
    submit,
  } = useWorkingLogWrite(groupId);

  const handleWriteOpen = () => {
    if (isWriting) {
      return;
    }
    goToToday();
    openWrite();
  };

  const handlePrevClick = () => {
    closeWrite();
    goPrevDate();
  };

  const handleNextClick = () => {
    closeWrite();
    goNextDate();
  };

  return (
    <>
      <CommonHeader title="근무일지" isSticky />
      <WorkingLogList
        displayDate={displayDate}
        isAtMin={isAtMin}
        isAtMax={isAtMax}
        filteredLogs={filteredLogs}
        onPrevClick={handlePrevClick}
        onNextClick={handleNextClick}
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
      <FloatingButton onClick={handleWriteOpen} />
    </>
  );
};

export default WorkingSpacePage;
