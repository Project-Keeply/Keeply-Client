import { queryKeys } from '@shared/query/query-keys';
import { useSuspenseQuery } from '@tanstack/react-query';

import { getNoticeList } from '../apis/announcement-api';
import type { Announcement } from '../types/announcement';
import { convertToAnnouncement } from '../utils/convert-announcement';

const useAnnouncements = (groupId: number) => {
  const { data } = useSuspenseQuery({
    queryKey: queryKeys.announcement.list(groupId),
    queryFn: () => getNoticeList(groupId),
  });
  const announcements: Announcement[] =
    data.content?.map(convertToAnnouncement) ?? [];
  return { announcements };
};

export default useAnnouncements;
