import { ApiError, setAccessToken, setRefreshToken } from '@shared/apis';
import { ROUTE_PATH } from '@shared/router/path';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';

import { postKakaoLogin } from '../apis/auth-api';

import { getMyGroup } from '@/entities/group';

export const useKakaoLogin = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (code: string) => postKakaoLogin(code),
    onSuccess: async ({ accessToken, refreshToken }) => {
      if (!accessToken) {
        navigate(ROUTE_PATH.LOGIN, { replace: true });
        return;
      }
      setAccessToken(accessToken);
      if (refreshToken) {
        setRefreshToken(refreshToken);
      }

      try {
        await getMyGroup();
        navigate(ROUTE_PATH.HOME, { replace: true });
      } catch (error) {
        if (error instanceof ApiError && error.status === 404) {
          navigate(ROUTE_PATH.ONBOARDING, { replace: true });
          return;
        }
        navigate(ROUTE_PATH.HOME, { replace: true });
      }
    },
    onError: () => {
      navigate(ROUTE_PATH.LOGIN, { replace: true });
    },
  });
};
