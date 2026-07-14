import { CommonHeader } from '@shared/components';
import FloatingButton from '@shared/components/FloatingButton';

import { useMyGroup } from '@/entities/group';
import WorkingLog from '@/entities/working-space/components/WorkingLog';
import WorkingLogList from '@/entities/working-space/components/WorkingLogList';
import useWorkingLogDate from '@/entities/working-space/hooks/use-working-log-date';
import {
  useWorkingLogItem,
  useWorkingLogWrite,
  WorkingLogBottomSheet,
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
    isPending: isCreating,
    openWrite,
    closeWrite,
    handleContentChange,
    submit,
  } = useWorkingLogWrite(groupId);
  const {
    selectedLog,
    isOpen,
    mode,
    editContent,
    isEditValid,
    isDeleting,
    isUpdating,
    handleLogClick,
    handleClose,
    handleDelete,
    handleEditClick,
    handleEditChange,
    handleEditCancel,
    handleSave,
  } = useWorkingLogItem(groupId);

  const handleWriteOpen = () => {
    if (isWriting) {
      return;
    }
    handleClose();
    goToToday();
    openWrite();
  };

  const handleLogSelect = (log: (typeof filteredLogs)[number]) => {
    closeWrite();
    handleLogClick(log);
  };

  const handlePrevClick = () => {
    closeWrite();
    handleClose();
    goPrevDate();
  };

  const handleNextClick = () => {
    closeWrite();
    handleClose();
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
        onLogClick={handleLogSelect}
        writeSlot={
          isWriting && (
            <WorkingLogWriteForm
              content={content}
              isValid={isValid}
              isPending={isCreating}
              onChange={handleContentChange}
              onSubmit={submit}
              onCancel={closeWrite}
            />
          )
        }
      />
      <WorkingLogBottomSheet
        open={isOpen}
        onClose={handleClose}
        mode={mode}
        onEdit={handleEditClick}
        onDelete={handleDelete}
        isDeleting={isDeleting}
        editContent={editContent}
        isEditValid={isEditValid}
        onEditChange={handleEditChange}
        onSave={handleSave}
        onEditCancel={handleEditCancel}
        isUpdating={isUpdating}
      >
        {selectedLog && (
          <WorkingLog
            tag={selectedLog.tag}
            content={selectedLog.content}
            variant={selectedLog.variant}
          />
        )}
      </WorkingLogBottomSheet>
      <FloatingButton onClick={handleWriteOpen} />
    </>
  );
};

export default WorkingSpacePage;
