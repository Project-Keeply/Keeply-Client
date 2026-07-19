import { useState } from 'react';

const STORAGE_KEY = 'announcement_checks';

interface CheckStorage {
  date: string;
  checkedIds: number[];
}

const getTodayDate = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const loadCheckedIds = (): number[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    return [];
  }
  const parsed: CheckStorage = JSON.parse(stored);
  if (parsed.date !== getTodayDate()) {
    return [];
  }
  return parsed.checkedIds;
};

const saveCheckedIds = (checkedIds: number[]) => {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({ date: getTodayDate(), checkedIds }),
  );
};

const useAnnouncementChecks = () => {
  const [checkedIds, setCheckedIds] = useState<number[]>(() => loadCheckedIds());

  const toggleCheck = (id: number) => {
    setCheckedIds((prev) => {
      const next = prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id];
      saveCheckedIds(next);
      return next;
    });
  };

  return { checkedIds, toggleCheck };
};

export default useAnnouncementChecks;
