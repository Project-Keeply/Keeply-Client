import type { ApiResponse } from '@shared/apis';
import { apiInstance, unwrapDataResponse } from '@shared/apis';

import type { MyGroupResponse } from '../types/group';

export const getMyGroup = async (): Promise<MyGroupResponse> => {
  const res = await apiInstance.get<ApiResponse<MyGroupResponse>>('/groups/me');
  return unwrapDataResponse(res);
};
