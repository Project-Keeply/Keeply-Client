const KAKAO_AUTH_BASE = 'https://kauth.kakao.com/oauth/authorize';

export const getKakaoAuthUrl = (): string => {
  const params = new URLSearchParams({
    client_id: import.meta.env.VITE_KAKAO_REST_API_KEY,
    redirect_uri: import.meta.env.VITE_KAKAO_REDIRECT_URI,
    response_type: 'code',
  })
  return `${KAKAO_AUTH_BASE}?${params.toString}`
}