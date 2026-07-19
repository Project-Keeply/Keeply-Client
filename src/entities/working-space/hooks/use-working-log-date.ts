import { useState } from 'react';
import { queryKeys } from '@shared/query/query-keys';
import { useSuspenseQuery } from '@tanstack/react-query';

import { getWorkLogList } from '../apis/work-log-api';
import { convertToWorkingLog } from '../utils/convert-work-log';

import { useUser } from '@/entities/user';

const DAYS = [
  '일요일',
  '월요일',
  '화요일',
  '수요일',
  '목요일',
  '금요일',
  '토요일',
];

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

const useWorkingLogDate = (groupId: number) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { user } = useUser();

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const minDate = new Date(today);
  minDate.setDate(minDate.getDate() - 6);

  const from = formatKeyDate(minDate);
  const to = formatKeyDate(today);

  const { data } = useSuspenseQuery({
    queryKey: [...queryKeys.worklog.list(groupId), from, to],
    queryFn: () => getWorkLogList(groupId, from, to),
  });

  const logs = (data.content ?? [])
    .filter((item) => item.workLogId !== undefined)
    .map((item) => convertToWorkingLog(item, user.id));

  const isAtMin = formatKeyDate(selectedDate) <= formatKeyDate(minDate);
  const isAtMax = formatKeyDate(selectedDate) >= formatKeyDate(today);

  const handlePrevClick = () => {
    setSelectedDate((prev) => {
      if (formatKeyDate(prev) <= formatKeyDate(minDate)) {
        return prev;
      }
      const next = new Date(prev);
      next.setDate(next.getDate() - 1);
      return next;
    });
  };

  const handleNextClick = () => {
    setSelectedDate((prev) => {
      if (formatKeyDate(prev) >= formatKeyDate(today)) {
        return prev;
      }
      const next = new Date(prev);
      next.setDate(next.getDate() + 1);
      return next;
    });
  };

  const filteredLogs = logs.filter(
    (log) => log.date === formatKeyDate(selectedDate),
  );

  const goToToday = () => {
    setSelectedDate(new Date());
  };

  return {
    displayDate: formatDisplayDate(selectedDate),
    isAtMin,
    isAtMax,
    handlePrevClick,
    handleNextClick,
    filteredLogs,
    goToToday,
  };
};

export default useWorkingLogDate;
