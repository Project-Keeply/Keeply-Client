export const queryKeys = {
  announcement: {
    all: ['announcement'] as const,
    lists: () => [...queryKeys.announcement.all, 'list'] as const,
    list: (groupId: number) =>
      [...queryKeys.announcement.lists(), groupId] as const,
    detail: (groupId: number, announcementId: number) =>
      [
        ...queryKeys.announcement.all,
        'detail',
        groupId,
        announcementId,
      ] as const,
  },
  group: {
    all: ['group'] as const,
    me: () => [...queryKeys.group.all, 'me'] as const,
  },
  user: {
    all: ['user'] as const,
    me: () => [...queryKeys.user.all, 'me'] as const,
  },
} as const;
