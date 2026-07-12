import { queryKeys } from '@shared/query/query-keys';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteNotice } from '../apis/announcement-api';

import { useMyGroup } from '@/entities/group';

const useDeleteAnnouncement = () => {
  const queryClient = useQueryClient();
  const { groupId } = useMyGroup();

  return useMutation({
    mutationFn: (noticeId: number) => deleteNotice(groupId, noticeId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.announcement.list(groupId),
      });
    },
  });
};

export default useDeleteAnnouncement;
