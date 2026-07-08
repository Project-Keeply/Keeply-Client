import { setAccessToken, setRefreshToken } from '@shared/apis';
import { ROUTE_PATH } from '@shared/router/path';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';

import { postKakaoLogin } from '../apis/auth-api';

export const useKakaoLogin = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (code: string) => postKakaoLogin(code),
    onSuccess({ accessToken, refreshToken }) {
      if (!accessToken) {
        navigate(ROUTE_PATH.LOGIN, { replace: true });
        return;
      }
      setAccessToken(accessToken);
      if (refreshToken) {
        setRefreshToken(refreshToken);
      }
      navigate(ROUTE_PATH.HOME, { replace: true });
    },
    onError: () => {
      navigate(ROUTE_PATH.LOGIN, { replace: true });
    },
  });
};
