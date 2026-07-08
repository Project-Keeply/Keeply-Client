const KAKAO_AUTH_BASE = 'https://kauth.kakao.com/oauth/authorize';

export const getKakaoAuthUrl = (): string => {
  const clientId = import.meta.env.VITE_KAKAO_REST_API_KEY;
  const redirectUri = import.meta.env.VITE_KAKAO_REDIRECT_URI;

  if (!clientId || !redirectUri) {
    throw new Error('Kakao OAuth 환경변수가 설정되지 않았습니다.');
  }

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: 'code',
  });
  return `${KAKAO_AUTH_BASE}?${params.toString()}`;
};
