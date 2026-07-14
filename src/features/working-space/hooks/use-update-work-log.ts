import { queryKeys } from '@shared/query/query-keys';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { updateWorkLog } from '@/entities/working-space/apis/work-log-api';

interface UpdateWorkLogVariables {
  workLogId: number;
  content: string;
}

const useUpdateWorkLog = (groupId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ workLogId, content }: UpdateWorkLogVariables) =>
      updateWorkLog(groupId, workLogId, { content }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.worklog.list(groupId),
      });
    },
  });
};

export default useUpdateWorkLog;
