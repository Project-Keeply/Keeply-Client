import { useState } from 'react';
import { IcLeftArrow, IcRightArrow } from '@shared/icons/svgs';
import type { WorkingLog as WorkingLogType } from '../types/working-log';
import WorkingLog from './WorkingLog';

interface WorkingLogListProps {
  logs: WorkingLogType[];
}

const DAYS = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];

const formatDisplayDate = (date: Date): string => {
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const dayOfWeek = DAYS[date.getDay()];
  return `${month}.${day} ${dayOfWeek}`;
};

const formatKeyDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const WorkingLogList = ({ logs }: WorkingLogListProps) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const minDate = new Date(today);
  minDate.setDate(minDate.getDate() - 6);

  const isAtMin = formatKeyDate(selectedDate) === formatKeyDate(minDate);
  const isAtMax = formatKeyDate(selectedDate) === formatKeyDate(today);

  const handlePrevClick = () => {
    if (isAtMin) return;
    setSelectedDate(prev => {
      const next = new Date(prev);
      next.setDate(next.getDate() - 1);
      return next;
    });
  };

  const handleNextClick = () => {
    if (isAtMax) return;
    setSelectedDate(prev => {
      const next = new Date(prev);
      next.setDate(next.getDate() + 1);
      return next;
    });
  };

  const filteredLogs = logs.filter(log => log.date === formatKeyDate(selectedDate));

  return (
    <div className="flex flex-col flex-1 min-h-0 pt-5">
      <div className="shrink-0 flex items-center justify-center gap-4 pb-6">
        <button type="button" onClick={handlePrevClick} disabled={isAtMin} className="outline-none disabled:opacity-30">
          <IcLeftArrow width={24} height={24} />
        </button>
        <span className="text-title2">{formatDisplayDate(selectedDate)}</span>
        <button type="button" onClick={handleNextClick} disabled={isAtMax} className="outline-none disabled:opacity-30">
          <IcRightArrow width={24} height={24} />
        </button>
      </div>
      <div className="flex flex-col overflow-y-auto">
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
