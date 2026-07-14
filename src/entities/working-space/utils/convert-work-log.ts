import type { components } from '@shared/types/schema';

import type { WorkingLog } from '../types/working-log';

type WorkLogResponse = components['schemas']['WorkLogResponse'];

// createdAt을 로컬 타임존 기준 YYYY-MM-DD로 변환 (날짜 필터 키와 포맷 일치)
const getLocalDate = (createdAt?: string): string => {
  if (!createdAt) {
    return '';
  }
  const date = new Date(createdAt);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const convertToWorkingLog = (
  res: WorkLogResponse,
  currentUserId: number,
): WorkingLog => ({
  id: String(res.workLogId ?? ''),
  tag: res.authorName ?? '',
  content: res.content ?? '',
  date: getLocalDate(res.createdAt),
  variant: res.authorUserId === currentUserId ? 'primary' : 'secondary',
});
