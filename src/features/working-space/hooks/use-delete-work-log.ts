import { TOAST_MESSAGE } from '@shared/constants/toast-message';
import { queryKeys } from '@shared/query/query-keys';
import { showErrorToast } from '@shared/utils/toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteWorkLog } from '@/entities/working-space/apis/work-log-api';

const useDeleteWorkLog = (groupId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (workLogId: number) => deleteWorkLog(groupId, workLogId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.worklog.list(groupId),
      });
    },
    onError: () => {
      showErrorToast(TOAST_MESSAGE.WORK_LOG_DELETE_FAIL);
    },
  });
};

export default useDeleteWorkLog;
