import { AnnouncementWriteForm } from '@/features/announcement-write';

/**
 * 공지사항 글쓰기 페이지 (라우팅 슬롯)
 * - announcement-write feature 의 폼을 렌더한다. 로직/조립은 feature 담당.
 */
const AnnouncementWritePage = () => {
  return <AnnouncementWriteForm />;
};

export default AnnouncementWritePage;
