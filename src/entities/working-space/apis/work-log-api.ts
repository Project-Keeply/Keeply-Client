import type { ApiResponse } from '@/shared/apis';
import { apiInstance, unwrapDataResponse } from '@/shared/apis';
import type { components } from '@/shared/types/schema';

type PageResponseWorkLog = components['schemas']['PageResponseWorkLogResponse'];
type CreateWorkLogRequest = components['schemas']['CreateWorkLogRequest'];
type WorkLogResponse = components['schemas']['WorkLogResponse']

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

export const createWorkLog = async (
  groupId: number,
  body: CreateWorkLogRequest,
): Promise<WorkLogResponse> => {
  const res = await apiInstance.post<ApiResponse<WorkLogResponse>>(
    `/groups/${groupId}/work-logs`,
    body,
  );
  return unwrapDataResponse(res);
}