import { queryKeys } from '@shared/query/query-keys';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteExpiryItem } from '../apis/disposal-api';

const useDeleteDisposal = (groupId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (itemId: number) => deleteExpiryItem(groupId, itemId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.disposal.list(groupId),
      });
    },
  });
};

export default useDeleteDisposal;
