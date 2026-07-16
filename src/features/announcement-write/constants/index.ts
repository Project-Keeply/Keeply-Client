/**
 * 공지사항 글쓰기 폼 상수
 * - 입력 글자수 상한을 한곳에서 관리한다. (스키마 검증 + Input/TextArea maxLength 공용)
 */

export const ANNOUNCEMENT_MAX_LENGTH = {
  TITLE: 30,
  CONTENT: 200,
} as const;
