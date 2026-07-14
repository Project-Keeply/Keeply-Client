import { queryKeys } from '@/shared/query/query-keys';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createWorkLog} from '@/entities/working-space/apis/work-log-api';

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