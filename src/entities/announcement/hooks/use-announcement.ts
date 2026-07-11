import { useSuspenseQuery } from '@tanstack/react-query';

import { getNoticeList } from '../apis/announcement-api';
import type { Announcement } from '../types/announcement';
import { convertToAnnouncement } from '../utils/convert-announcement';

import { queryKeys } from '@/shared/query/query-keys';

const useAnnouncements = (groupId: number) => {
  const { data } = useSuspenseQuery({
    queryKey: queryKeys.announcement.list(groupId),
    queryFn: () => getNoticeList(groupId),
  })
  const announcement: Announcement[] = data.content?.map(convertToAnnouncement) ?? [];
  return { announcement };
}

export default useAnnouncements;