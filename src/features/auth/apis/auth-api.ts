import type { ApiResponse } from '@shared/apis';
import { apiInstance, unwrapDataResponse } from '@shared/apis';

import type { LoginResponse } from '../types/auth';

export const postKakaoLogin = async (code: string): Promise<LoginResponse> => {
  const res = await apiInstance.post<ApiResponse<LoginResponse>>(
    '/auth/kakao/callback',
    { code },
  );
  return unwrapDataResponse(res);
};
