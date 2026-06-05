import { AnnouncementItemList } from '@/entities/announcement';
import type { Announcement } from '@/entities/announcement';

const MOCK_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 1,
    tag: '주간',
    title:
      '종량제 봉투 판매 수량 제한종량제 봉투 판매 수량 제한종량제 봉투 판매 수량 제한종량제 봉투 판매 수량 제한',
    imgUrl: '',
    content: '봉투 판매 수량을 1인당 최대 2개로 제한합니다.',
  },
  {
    id: 2,
    tag: '주간',
    title: '종량제 봉투 판매 수량 제한',
    imgUrl: '',
    content: '봉투 판매 수량을 1인당 최대 2개로 제한합니다.',
  },
  {
    id: 3,
    tag: '일일',
    title: '종량제 봉투 판매 수량 제한',
    imgUrl: '',
    content: '봉투 판매 수량을 1인당 최대 2개로 제한합니다.',
  },
  {
    id: 4,
    tag: '주간',
    title: '종량제 봉투 판매 수량 제한',
    imgUrl: '',
    content: '봉투 판매 수량을 1인당 최대 2개로 제한합니다.',
  },
];

const HomePage = () => {
  return (
    <div className="flex flex-1 flex-col bg-lightgray p-6.25">
      <AnnouncementItemList date={new Date()} items={MOCK_ANNOUNCEMENTS} />
    </div>
  );
};

export default HomePage;
