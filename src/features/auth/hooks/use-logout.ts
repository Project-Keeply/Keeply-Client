import { useMutation } from '@tanstack/react-query';

import { logout } from '../apis/auth-api';
import { useClearSession } from './use-clear-session';

export const useLogout = () => {
  const clearSession = useClearSession();

  return useMutation({
    mutationFn: logout,
    onSettled: clearSession,
  });
};
