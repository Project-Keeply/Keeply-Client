import type { LoginResponse } from '../types/auth';

import type { ApiResponse } from '@/shared/apis';
import { apiInstance, unwrapResponse } from '@/shared/apis';

export const postKakaoLogin = async(code: string): Promise<LoginResponse> => {
  const res = await apiInstance.post<ApiResponse<LoginResponse>>(
    '/auth/kakao/callback',
    {code},
  )
  return unwrapResponse(res)
}