  export const DISPOSAL_CATEGORIES = ['음료', '과자', '라면', 'FF', '유제품', '기타'] as const;
  export type DisposalCategory = (typeof
  DISPOSAL_CATEGORIES)[number];