import { TOAST_MESSAGE } from '@shared/constants/toast-message';
import { queryKeys } from '@shared/query/query-keys';
import { showErrorToast } from '@shared/utils/toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createWorkLog } from '@/entities/working-space/apis/work-log-api';

const useCreateWorkLog = (groupId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (content: string) => createWorkLog(groupId, { content }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.worklog.list(groupId),
      });
    },
    onError: () => {
      showErrorToast(TOAST_MESSAGE.WORK_LOG_CREATE_FAIL);
    },
  });
};

export default useCreateWorkLog;
