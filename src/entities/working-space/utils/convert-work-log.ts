import type { WorkingLog } from '../types/working-log';

import type { components } from '@/shared/types/schema';

type WorkLogResponse = components['schemas']['WorkLogResponse'];

export const convertToWorkingLog = (
  res: WorkLogResponse, 
  currentUserId: number,
): WorkingLog => ({
  id: String(res.workLogId ?? ''),
  tag: res.authorName ?? '',
  content: res.content ?? '',
  date: (res.createdAt ?? '').slice(0, 10),
  variant: res.authorUserId === currentUserId ? 'primary' : 'secondary'
})