import { apiInstance, unwrapDataResponse } from '@/shared/apis';
import type { ApiResponse } from '@/shared/apis';
import type { components } from '@/shared/types/schema';

type PageResponseWorkLog = components['schemas']['PageResponseWorkLogResponse'];

export const getWorkLogList = async (
  groupId: number,
  from: string,
  to: string,
): Promise<PageResponseWorkLog> => {
  const res = await apiInstance.get<ApiResponse<PageResponseWorkLog>>(
    `/groups/${groupId}/work-logs`,
    { params: {from, to, page: 0, size: 100}},
  );
  return unwrapDataResponse(res);
}