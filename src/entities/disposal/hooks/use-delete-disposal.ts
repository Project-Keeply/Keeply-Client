import { TOAST_MESSAGE } from '@shared/constants/toast-message';
import { queryKeys } from '@shared/query/query-keys';
import { showErrorToast } from '@shared/utils/toast';
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
    onError: () => {
      showErrorToast(TOAST_MESSAGE.DISPOSAL_DELETE_FAIL);
    },
  });
};

export default useDeleteDisposal;
