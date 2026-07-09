import { removeAccessToken, removeRefreshToken } from '@shared/apis';
import { ROUTE_PATH } from '@shared/router/path';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router';

export const useClearSession = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return () => {
    removeAccessToken();
    removeRefreshToken();
    queryClient.clear();
    navigate(ROUTE_PATH.LOGIN, { replace: true });
  };
};
