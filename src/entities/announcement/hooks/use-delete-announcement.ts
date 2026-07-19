import { TOAST_MESSAGE } from '@shared/constants/toast-message';
import { queryKeys } from '@shared/query/query-keys';
import { showErrorToast } from '@shared/utils/toast';
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
    onError: () => {
      showErrorToast(TOAST_MESSAGE.ANNOUNCEMENT_DELETE_FAIL);
    },
  });
};

export default useDeleteAnnouncement;
