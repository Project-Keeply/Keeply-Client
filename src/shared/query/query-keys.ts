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
  disposal: {
    all: ['disposal'] as const,
    lists: () => [...queryKeys.disposal.all, 'list'] as const,
    list: (groupId: number) =>
      [...queryKeys.disposal.lists(), groupId] as const,
  },
  group: {
    all: ['group'] as const,
    me: () => [...queryKeys.group.all, 'me'] as const,
  },
  user: {
    all: ['user'] as const,
    me: () => [...queryKeys.user.all, 'me'] as const,
  },
  worklog: {
    all: ['worklog'] as const,
    lists: () => [...queryKeys.worklog.all, 'list'] as const,
    list: (groupId: number) => [...queryKeys.worklog.lists(), groupId] as const,
  },
} as const;
