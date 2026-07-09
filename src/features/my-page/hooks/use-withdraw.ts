import { useMutation } from '@tanstack/react-query';

import { deleteUser } from '@/entities/user'
import { useClearSession } from '@/features/auth';

export const useWithdraw = () => {
  const clearSession = useClearSession();
  return useMutation({
    mutationFn: deleteUser,
    onSuccess: clearSession,
  })
}