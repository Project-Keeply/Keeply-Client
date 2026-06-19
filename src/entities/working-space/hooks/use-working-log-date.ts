import { useState } from 'react';

import type { WorkingLog } from '../types/working-log';

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

const useWorkingLogDate = (logs: WorkingLog[]) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const minDate = new Date(today);
  minDate.setDate(minDate.getDate() - 6);

  const isAtMin = formatKeyDate(selectedDate) === formatKeyDate(minDate);
  const isAtMax = formatKeyDate(selectedDate) === formatKeyDate(today);

  const handlePrevClick = () => {
    if (isAtMin) {return;}
    setSelectedDate(prev => {
      const next = new Date(prev);
      next.setDate(next.getDate() - 1);
      return next;
    });
  };

  const handleNextClick = () => {
    if (isAtMax) {return;}
    setSelectedDate(prev => {
      const next = new Date(prev);
      next.setDate(next.getDate() + 1);
      return next;
    });
  };

  const filteredLogs = logs.filter(log => log.date === formatKeyDate(selectedDate));

  return {
    displayDate: formatDisplayDate(selectedDate),
    isAtMin,
    isAtMax,
    handlePrevClick,
    handleNextClick,
    filteredLogs,
  };
};

export default useWorkingLogDate;
