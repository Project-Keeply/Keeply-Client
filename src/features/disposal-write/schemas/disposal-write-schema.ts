/**
 * 폐기관리 글쓰기 폼 스키마
 * - zod 스키마와 폼 값 타입(DisposalWriteFormValues)을 정의한다.
 * - 카테고리 값은 @/entities/disposal 의 DISPOSAL_CATEGORIES 를 재사용.
 */

import { z } from 'zod';

import { DISPOSAL_CATEGORIES } from '@/entities/disposal';
// TODO: zod 스키마 및 DisposalWriteFormValues 타입 구현
export const disposalWriteSchema = z.object({
  title: z.string().min(1, '상품명을 입력해주세요.'),
  category: z.enum(DISPOSAL_CATEGORIES, '카테고리를 선택해주세요.'),
  date: z.string().min(1, '유통기한을 입력해주세요.'),
  image: z.instanceof(File).optional(),
})

export type DisposalWriteFormValues = z.infer<typeof disposalWriteSchema>;