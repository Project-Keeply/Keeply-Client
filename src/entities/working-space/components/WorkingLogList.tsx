import { IcLeftArrow, IcRightArrow } from '@shared/icons/svgs';
import type { ReactNode } from 'react';

import useWorkingLogDate from '../hooks/use-working-log-date';
import type { WorkingLog as WorkingLogType } from '../types/working-log';
import WorkingLog from './WorkingLog';

interface WorkingLogListProps {
  logs: WorkingLogType[];
  writeSlot?: ReactNode;
}

const WorkingLogList = ({ logs, writeSlot }: WorkingLogListProps) => {
  const { displayDate, isAtMin, isAtMax, handlePrevClick, handleNextClick, filteredLogs } =
    useWorkingLogDate(logs);

  return (
    <div className="flex flex-col flex-1 min-h-0 pt-5">
      <div className="shrink-0 flex items-center justify-center gap-4 pb-6">
        <button type="button" onClick={handlePrevClick} disabled={isAtMin} className="outline-none disabled:opacity-30">
          <IcLeftArrow width={24} height={24} />
        </button>
        <span className="text-title2">{displayDate}</span>
        <button type="button" onClick={handleNextClick} disabled={isAtMax} className="outline-none disabled:opacity-30">
          <IcRightArrow width={24} height={24} />
        </button>
      </div>
      <div className="flex flex-col flex-1 min-h-0 overflow-y-auto">
        {writeSlot}
        {filteredLogs.map(log => (
          <WorkingLog
            key={log.id}
            tag={log.tag}
            content={log.content}
            variant={log.variant}
          />
        ))}
      </div>
    </div>
  );
};

export default WorkingLogList;
