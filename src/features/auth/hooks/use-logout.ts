import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router';

import { logout } from '../apis/auth-api';

import { removeAccessToken, removeRefreshToken } from '@/shared/apis';
import { ROUTE_PATH } from '@/shared/router/path';

export const useLogOut = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout, 
    onSettled: () => {
      removeAccessToken();
      removeRefreshToken();
      queryClient.clear();
      navigate(ROUTE_PATH.LOGIN, {replace: true})
    }
  })
}