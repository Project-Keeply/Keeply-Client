import type { ApiResponse } from '@/shared/apis';
import { apiInstance, unwrapDataResponse } from '@/shared/apis';
import type { components } from '@/shared/types/schema';

type PageResponseNoticeList =
  components['schemas']['PageResponseNoticeListResponse'];
type CreateNoticeRequest = components['schemas']['CreateNoticeRequest'];
type NoticeResponse = components['schemas']['NoticeResponse'];

export const getNoticeList = async (
  groupId: number,
): Promise<PageResponseNoticeList> => {
  const res = await apiInstance.get<ApiResponse<PageResponseNoticeList>>(
    `/groups/${groupId}/notices`,
    {params: {active: true, page: 0, size: 100}}
  );
  return unwrapDataResponse(res);
}

export const createNotice = async (
  groupId: number,
  body: CreateNoticeRequest,
): Promise<NoticeResponse> => {
  const res = await apiInstance.post<ApiResponse<NoticeResponse>>(
    `/groups/${groupId}/notices`,
    body,
  );
  return unwrapDataResponse(res);
}

export const deleteNotice = async (
  groupId: number,
  noticeId: number,
): Promise<void> => {
  await apiInstance.delete<void>(
    `/groups/${groupId}/notices/${noticeId}`,
  );
};