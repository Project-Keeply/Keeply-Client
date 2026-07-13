import { queryKeys } from '@shared/query/query-keys';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteExpiryItem } from '../apis/disposal-api';

import { useMyGroup } from '@/entities/group';

const useDeleteDisposal = () => {
  const queryClient = useQueryClient();
  const { groupId } = useMyGroup();

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
