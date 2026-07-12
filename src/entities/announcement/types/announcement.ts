export interface Announcement {
  id: number;
  authorUserId: number;
  imgUrl: string;
  tag: '주간' | '일일';
  title: string;
  content?: string;
}