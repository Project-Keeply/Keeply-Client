import type { ApiResponse } from '@/shared/apis';
import { apiInstance, unwrapDataResponse } from '@/shared/apis';
import type { components } from '@/shared/types/schema';

type PageResponseNoticeList =
  components['schemas']['PageResponseNoticeListResponse'];

export const getNoticeList = async (
  groupId: number,
): Promise<PageResponseNoticeList> => {
  const res = await apiInstance.get<ApiResponse<PageResponseNoticeList>>(
    `/groups/${groupId}/notices`,
    {params: {active: true, page: 0, size: 100}}
  );
  return unwrapDataResponse(res);
}