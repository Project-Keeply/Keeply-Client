import type { Announcement } from '../types/announcement';

import type { components } from '@/shared/types/schema';

type NoticeListResponse = components['schemas']['NoticeListResponse'];

export const convertToAnnouncement = (notice: NoticeListResponse): Announcement => ({
  id: notice.noticeId ?? 0,
  tag: notice.tag === 'WEEKLY' ? '주간' : '일일',
  imgUrl: notice.imageUrl ?? '',
  title: notice.title ?? '',
})