import type { ApiResponse } from '@/shared/apis';
import { apiInstance, unwrapDataResponse } from '@/shared/apis';
import type { components } from '@/shared/types/schema';

type MyGroupResponse = components['schemas']['GroupResponse'];

export const getMyGroup = async (): Promise<MyGroupResponse> => {
  const res = await apiInstance.get<ApiResponse<MyGroupResponse>>('/group/me');
  return unwrapDataResponse(res);
}