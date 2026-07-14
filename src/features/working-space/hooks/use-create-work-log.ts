import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createWorkLog } from '@/entities/working-space/apis/work-log-api';
import { queryKeys } from '@/shared/query/query-keys';

const useCreateWorkLog = (groupId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (content: string) => createWorkLog(groupId, { content }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.worklog.list(groupId),
      });
    },
  });
};

export default useCreateWorkLog;