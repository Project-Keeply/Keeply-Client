export const queryKeys = {
  notice: {
    all: ['notice'] as const,
    lists: () => [...queryKeys.notice.all, 'list'] as const,
    list: (groupId: number) => [...queryKeys.notice.lists(), groupId] as const,
    detail: (groupId: number, noticeId: number) =>
      [...queryKeys.notice.all, 'detail', groupId, noticeId] as const,
  },
  user: {
    all: ['user'] as const,
    me: () => [...queryKeys.user.all, 'me'] as const,
  }
} as const;
