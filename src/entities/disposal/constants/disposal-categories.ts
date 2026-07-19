import type { components } from '@/shared/types/schema';

export type ExpiryItemCategory =
  components['schemas']['CreateExpiryItemRequest']['category'];

export const DISPOSAL_CATEGORIES = [
  '음료',
  '과자',
  '라면',
  'FF',
  '유제품',
  '기타',
] as const;
export type DisposalCategory = (typeof DISPOSAL_CATEGORIES)[number];

// 서버 enum -> 한글 라벨
export const CATEGORY_TO_LABEL: Record<ExpiryItemCategory, DisposalCategory> = {
  BEVERAGE: '음료',
  SNACK: '과자',
  NOODLE: '라면',
  FF: 'FF',
  DAIRY: '유제품',
  ETC: '기타',
};

// 한글 라벨 -> 서버
export const LABEL_TO_CATEGORY: Record<DisposalCategory, ExpiryItemCategory> = {
  음료: 'BEVERAGE',
  과자: 'SNACK',
  라면: 'NOODLE',
  FF: 'FF',
  유제품: 'DAIRY',
  기타: 'ETC',
};
