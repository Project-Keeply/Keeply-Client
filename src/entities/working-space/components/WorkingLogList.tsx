import { EmptyState } from '@shared/components';
import { IcLeftArrow, IcRightArrow } from '@shared/icons/svgs';
import type { ReactNode } from 'react';

import type { WorkingLog as WorkingLogType } from '../types/working-log';
import WorkingLog from './WorkingLog';

interface WorkingLogListProps {
  displayDate: string;
  isAtMin: boolean;
  isAtMax: boolean;
  filteredLogs: WorkingLogType[];
  onPrevClick: () => void;
  onNextClick: () => void;
  onLogClick: (log: WorkingLogType) => void;
  writeSlot?: ReactNode;
}

const WorkingLogList = ({
  displayDate,
  isAtMin,
  isAtMax,
  filteredLogs,
  onPrevClick,
  onNextClick,
  onLogClick,
  writeSlot,
}: WorkingLogListProps) => {
  return (
    <div className="flex flex-col flex-1 min-h-0 pt-5">
      <div className="shrink-0 flex items-center justify-center gap-4 pb-6">
        <button
          type="button"
          onClick={onPrevClick}
          disabled={isAtMin}
          className="outline-none disabled:opacity-30"
        >
          <IcLeftArrow width={24} height={24} />
        </button>
        <span className="text-title2">{displayDate}</span>
        <button
          type="button"
          onClick={onNextClick}
          disabled={isAtMax}
          className="outline-none disabled:opacity-30"
        >
          <IcRightArrow width={24} height={24} />
        </button>
      </div>
      <div className="flex flex-col flex-1 min-h-0 overflow-y-auto">
        {writeSlot}
        {filteredLogs.length === 0 && !writeSlot ? (
          <div className="flex flex-1 items-center justify-center py-36">
            <EmptyState message="등록된 근무일지가 없어요" />
          </div>
        ) : (
          filteredLogs.map((log) => (
            <WorkingLog
              key={log.id}
              tag={log.tag}
              content={log.content}
              variant={log.variant}
              onClick={
                log.variant === 'primary' ? () => onLogClick(log) : undefined
              }
            />
          ))
        )}
      </div>
    </div>
  );
};

export default WorkingLogList;
