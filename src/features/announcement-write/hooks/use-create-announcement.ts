import { uploadImage } from '@shared/apis';
import { TOAST_MESSAGE } from '@shared/constants/toast-message';
import { queryKeys } from '@shared/query/query-keys';
import { showErrorToast } from '@shared/utils/toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { AnnouncementWriteFormValues } from '../schemas/announcement-write-schema';

import { convertToServerTag, createNotice } from '@/entities/announcement';

interface UseCreateAnnouncementParams {
  groupId: number;
}

const useCreateAnnouncement = ({ groupId }: UseCreateAnnouncementParams) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (values: AnnouncementWriteFormValues) => {
      const imageUrl = values.image
        ? await uploadImage(values.image, 'NOTICE')
        : undefined;

      return createNotice(groupId, {
        title: values.title,
        content: values.content ?? '',
        tag: convertToServerTag(values.tag),
        imageUrl,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.announcement.list(groupId),
      });
    },
    onError: () => {
      showErrorToast(TOAST_MESSAGE.ANNOUNCEMENT_CREATE_FAIL);
    },
  });
};

export default useCreateAnnouncement;
