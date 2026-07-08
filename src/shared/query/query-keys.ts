/**
 * TanStack Query queryKey 팩토리.
 *
 * queryKey 문자열을 하드코딩하지 않고 이 객체를 통해 생성한다.
 * 계층 구조(all → lists → list / detail)를 두어 상위 키로 하위 전체를 무효화할 수 있다.
 * 도메인 추가 시 이 객체에 항목을 추가한다. (도메인별 실제 키는 각 도메인 이슈에서 확장)
 *
 * @example
 * useQuery({ queryKey: queryKeys.notice.list(groupId), ... });
 * queryClient.invalidateQueries({ queryKey: queryKeys.notice.all }); // notice 전체 무효화
 */
export const queryKeys = {
  notice: {
    all: ['notice'] as const,
    lists: () => [...queryKeys.notice.all, 'list'] as const,
    list: (groupId: number) => [...queryKeys.notice.lists(), groupId] as const,
    detail: (noticeId: number) =>
      [...queryKeys.notice.all, 'detail', noticeId] as const,
  },
} as const;
