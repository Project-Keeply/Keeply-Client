import { uploadImage } from '@shared/apis';
import { TOAST_MESSAGE } from '@shared/constants/toast-message';
import { queryKeys } from '@shared/query/query-keys';
import { showErrorToast } from '@shared/utils/toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { DisposalWriteFormValues } from '../schemas/disposal-write-schema';

import { convertToServerCategory, createExpiryItem } from '@/entities/disposal';

interface UseCreateDisposalParams {
  groupId: number;
}

const useCreateDisposal = ({ groupId }: UseCreateDisposalParams) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (values: DisposalWriteFormValues) => {
      const imageUrl = await uploadImage(values.image, 'EXPIRY_ITEM');

      return createExpiryItem(groupId, {
        productName: values.title,
        expireDate: values.date,
        category: convertToServerCategory(values.category),
        imageUrl,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.disposal.list(groupId),
      });
    },
    onError: () => {
      showErrorToast(TOAST_MESSAGE.DISPOSAL_CREATE_FAIL);
    },
  });
};

export default useCreateDisposal;
