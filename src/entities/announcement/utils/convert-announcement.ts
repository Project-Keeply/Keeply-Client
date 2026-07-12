import type { Announcement } from '../types/announcement';

import type { components } from '@/shared/types/schema';

type NoticeListResponse = components['schemas']['NoticeListResponse'];
type NoticeTag = components['schemas']['CreateNoticeRequest']['tag'];

export const convertToServerTag = (tag: Announcement['tag']): NoticeTag =>
  tag === '주간' ? 'WEEKLY' : 'DAILY';

export const convertToAnnouncement = (
  notice: NoticeListResponse,
): Announcement => ({
  id: notice.noticeId ?? 0,
  tag: notice.tag === 'WEEKLY' ? '주간' : '일일',
  authorUserId: notice.authorUserId ?? 0,
  imgUrl: notice.imageUrl ?? '',
  title: notice.title ?? '',
  content: notice.content,
});
