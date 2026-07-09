import { removeAccessToken, removeRefreshToken } from '@shared/apis';
import { ROUTE_PATH } from '@shared/router/path';
import { useNavigate } from 'react-router';

export const useClearSession = () => {
  const navigate = useNavigate();

  return () => {
    removeAccessToken();
    removeRefreshToken();
    navigate(ROUTE_PATH.LOGIN, { replace: true });
  };
};
