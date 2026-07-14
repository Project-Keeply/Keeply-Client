import { queryKeys } from '@shared/query/query-keys';
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
  });
};

export default useDeleteWorkLog;
