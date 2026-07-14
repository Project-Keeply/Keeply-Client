import type { components } from '@shared/types/schema';

import type { WorkingLog } from '../types/working-log';

type WorkLogResponse = components['schemas']['WorkLogResponse'];

export const convertToWorkingLog = (
  res: WorkLogResponse,
  currentUserId: number,
): WorkingLog => ({
  id: String(res.workLogId ?? ''),
  tag: res.authorName ?? '',
  content: res.content ?? '',
  date: (res.createdAt ?? '').slice(0, 10),
  variant: res.authorUserId === currentUserId ? 'primary' : 'secondary',
});
