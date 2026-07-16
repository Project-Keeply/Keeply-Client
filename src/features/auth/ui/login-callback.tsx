import { useEffect, useRef } from 'react';
import { LoadingScreen } from '@shared/components';
import { ROUTE_PATH } from '@shared/router/path';
import { useNavigate, useSearchParams } from 'react-router';

import { useKakaoLogin } from '../hooks/use-kakao-login';

const LoginCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { mutate } = useKakaoLogin();
  const hasRequestedRef = useRef(false);

  useEffect(() => {
    if (hasRequestedRef.current) {
      return;
    }
    const code = searchParams.get('code');
    const error = searchParams.get('error');
    if (error || !code) {
      navigate(ROUTE_PATH.LOGIN, { replace: true });
      return;
    }
    hasRequestedRef.current = true;
    mutate(code);
  }, [searchParams, mutate, navigate]);
  return <LoadingScreen />;
};

export default LoginCallback;
