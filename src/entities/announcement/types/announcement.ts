export interface Announcement {
  id: number;
  imgUrl: string;
  tag: '주간' | '일일';
  title: string;
  content?: string;
}