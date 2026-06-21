  export const DISPOSAL_CATEGORIES = ['음료', '과자', '라면', 'FF'] as const;
  export type DisposalCategory = (typeof
  DISPOSAL_CATEGORIES)[number];