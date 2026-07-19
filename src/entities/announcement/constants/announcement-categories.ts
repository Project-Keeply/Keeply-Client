export const ANNOUNCEMENT_CATEGORIES = ['주간', '일일'] as const;
export type AnnouncementCategory = (typeof ANNOUNCEMENT_CATEGORIES)[number];
