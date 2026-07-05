/**
 * 공지사항 글쓰기 폼 스키마
 * - zod 스키마와 폼 값 타입(AnnouncementWriteFormValues)을 정의한다.
 * - 태그 값은 @/entities/announcement 의 ANNOUNCEMENT_CATEGORIES 를 재사용.
 */

import { z } from 'zod';

import { ANNOUNCEMENT_CATEGORIES } from '@/entities/announcement';

export const announcementWriteSchema = z.object({
  title: z.string().min(1, '제목을 입력해주세요.'),
  tag: z.enum(ANNOUNCEMENT_CATEGORIES, '태그를 선택해주세요.'),
  content: z.string().optional(),
  image: z.instanceof(File).optional(),
});

export type AnnouncementWriteFormValues = z.infer<typeof announcementWriteSchema>;
