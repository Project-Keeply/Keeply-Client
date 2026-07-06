import { CommonHeader } from '@shared/components';
import FloatingButton from '@shared/components/FloatingButton';

import WorkingLogList from '@/entities/working-space/components/WorkingLogList';
import useWorkingLogDate from '@/entities/working-space/hooks/use-working-log-date';
import type { WorkingLog } from '@/entities/working-space/types/working-log';
import { useWorkingLogWrite,WorkingLogWriteForm } from '@/features/working-space';

// ⚠️ 임시 목업 데이터 (미리보기용) — API 연동 전까지만. 커밋 전 제거
const getTodayKey = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const MOCK_LOGS: WorkingLog[] = [
  {
    id: '1',
    tag: '훈진',
    content: '근무일지근무일지근무일지근무일지근무일지근무',
    date: getTodayKey(),
    variant: 'primary',
  },
  {
    id: '2',
    tag: '훈진',
    content: '근무일지근무일지근무일지근무일지근무일지근무',
    date: getTodayKey(),
    variant: 'primary',
  },
  {
    id: '3',
    tag: '훈진',
    content: '근무일지근무일지근무일지근무일지근무일지근무',
    date: getTodayKey(),
    variant: 'primary',
  },
  {
    id: '4',
    tag: '진훈',
    content: '근무일지근무일지근무일지근무일지근무일지근무',
    date: getTodayKey(),
    variant: 'secondary',
  },
  {
    id: '5',
    tag: '진훈',
    content: '근무일지근무일지근무일지근무일지근무일지근무',
    date: getTodayKey(),
    variant: 'secondary',
  },
  {
    id: '6',
    tag: '진훈',
    content: '근무일지근무일지근무일지근무일지근무일지근무',
    date: getTodayKey(),
    variant: 'secondary',
  },
];

const WorkingSpacePage = () => {
  const {
    displayDate,
    isAtMin,
    isAtMax,
    handlePrevClick: goPrevDate,
    handleNextClick: goNextDate,
    filteredLogs,
    goToToday,
  } = useWorkingLogDate(MOCK_LOGS);
  const { isWriting, content, isValid, openWrite, closeWrite, handleContentChange, submit } =
    useWorkingLogWrite();

  const handleWriteOpen = () => {
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
