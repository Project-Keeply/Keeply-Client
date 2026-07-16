import { TOAST_MESSAGE } from '@shared/constants/toast-message';
import { showErrorToast } from '@shared/utils/toast';
import { useMutation } from '@tanstack/react-query';

import { deleteUser } from '@/entities/user';
import { useClearSession } from '@/features/auth';

export const useWithdraw = () => {
  const clearSession = useClearSession();
  return useMutation({
    mutationFn: deleteUser,
    onSuccess: clearSession,
    onError: () => {
      showErrorToast(TOAST_MESSAGE.WITHDRAW_FAIL);
    },
  });
};
