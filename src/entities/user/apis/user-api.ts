import type { ApiResponse } from '@shared/apis';
import { apiInstance, unwrapDataResponse } from '@shared/apis';

import type { UserResponse } from '../types/user';

export const getMe = async (): Promise<UserResponse> => {
  const res = await apiInstance.get<ApiResponse<UserResponse>>('/users/me');
  return unwrapDataResponse(res);
}

export const deleteUser = async(): Promise<void> => {
  await apiInstance.delete<ApiResponse<void>>('/users/me');
}