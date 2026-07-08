import { useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router';

import { useKakaoLogin } from '../hooks/use-kakao-login';

const LoginCallback = () => {
  const [searchParams] = useSearchParams();
  const { mutate } = useKakaoLogin();
  const hasRequestedRef = useRef(false);

  useEffect(() => {
    if (hasRequestedRef.current) {
      return;
    }
    const code = searchParams.get('code');
    if (!code) {
      return;
    }
    hasRequestedRef.current = true;
    mutate(code);
  }, [searchParams, mutate]);
  return (
    <div>
      <p>로딩중...</p>
    </div>
  );
};

export default LoginCallback;
