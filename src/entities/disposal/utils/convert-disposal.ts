import type { components } from '@shared/types/schema';

import {
  CATEGORY_TO_LABEL,
  type DisposalCategory,
  type ExpiryItemCategory,
  LABEL_TO_CATEGORY,
} from '../constants/disposal-categories';
import type { DisposalItem } from '../types/disposal';

type ExpiryItemResponse = components['schemas']['ExpiryItemResponse'];

// 서버 응답 -> 화면용 DisposalItem
export const convertToDisposalItem = (
  item: ExpiryItemResponse,
): DisposalItem => ({
  id: item.expiryItemId ?? 0,
  imgUrl: item.imageUrl ?? '',
  title: item.productName ?? '',
  category: item.category ? CATEGORY_TO_LABEL[item.category] : '기타',
  expirationDate: item.expireDate ?? '',
});

// 작성 폼 한글 라벨 -> 서버 enum
export const convertToServerCategory = (
  label: DisposalCategory,
): ExpiryItemCategory => LABEL_TO_CATEGORY[label];
