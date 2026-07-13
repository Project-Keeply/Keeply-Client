import { ApiError, apiInstance, unwrapDataResponse } from '@shared/apis';

import type { ApiResponse } from '@/shared/apis';
import type { components } from '@/shared/types/schema';

type PageResponseExpiryItem = components['schemas']['PageResponseExpiryItemResponse'];
type CreateExpiryItemRequest = components['schemas']['CreateExpiryItemRequest'];
type ExpiryItemResponse = components['schemas']['ExpiryItemResponse'];

export const getExiryItemList = async (
  groupId: number,
): Promise<PageResponseExpiryItem> => {
  const res = await apiInstance.get<ApiResponse<PageResponseExpiryItem>>(
    `groups/${groupId}/expiry-items`,
    { params: {page: 0, size: 100}}
  );
  return unwrapDataResponse(res);
}

export const createExiryItem = async (
  groupId: number,
  body: CreateExpiryItemRequest,
): Promise<ExpiryItemResponse> => {
  const res = await apiInstance.post<ApiResponse<ExpiryItemResponse>>(
    `groups/${groupId}/expiry-items`,
    body,
  );
  return unwrapDataResponse(res);
}

export const deleteExpiryItem = async (
  groupId: number, 
  itemId: number, 
): Promise<void> => {
  const res = await apiInstance.delete<ApiResponse<void>>(
    `groups/${groupId}/expiry-items/${itemId}`
  )
  if(!res.data.success) {
    throw new ApiError(
      res.data.message ?? '폐기 상품 삭제에 실패했어요',
      res.status,
    )
  }
}