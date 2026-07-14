import type { ApiResponse } from '@/shared/apis';
import { ApiError, apiInstance, unwrapDataResponse } from '@/shared/apis';
import type { components } from '@/shared/types/schema';

type PageResponseWorkLog = components['schemas']['PageResponseWorkLogResponse'];
type CreateWorkLogRequest = components['schemas']['CreateWorkLogRequest'];
type UpdateWorkLogRequest = components['schemas']['UpdateWorkLogRequest'];
type WorkLogResponse = components['schemas']['WorkLogResponse'];

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
};

export const updateWorkLog = async (
  groupId: number,
  workLogId: number,
  body: UpdateWorkLogRequest,
): Promise<WorkLogResponse> => {
  const res = await apiInstance.patch<ApiResponse<WorkLogResponse>>(
    `/groups/${groupId}/work-logs/${workLogId}`,
    body,
  );
  return unwrapDataResponse(res);
};

export const deleteWorkLog = async (
  groupId: number,
  workLogId: number,
): Promise<void> => {
  const res = await apiInstance.delete<ApiResponse<void>>(
    `/groups/${groupId}/work-logs/${workLogId}`,
  );
  if (!res.data.success) {
    throw new ApiError(
      res.data.message ?? '근무일지 삭제에 실패했어요',
      res.status,
    );
  }
};