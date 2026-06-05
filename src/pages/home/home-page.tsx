import { AnnouncementBottomSheet, AnnouncementItem, useAnnouncementChecks } from '@/entities/announcement';
import type { Announcement } from '@/entities/announcement';
import useBottomSheet from '@shared/hooks/use-bottom-sheet';

const MOCK_ANNOUNCEMENTS = [
  { id: 1, tag: '주간', title: '종량제 봉투 판매 수량 제한', imgUrl: '', content: '봉투 판매 수량을 1인당 최대 2개로 제한합니다.' },
  { id: 2, tag: '주간', title: '종량제 봉투 판매 수량 제한', imgUrl: '', content: '봉투 판매 수량을 1인당 최대 2개로 제한합니다.' },
  { id: 3, tag: '일일', title: '종량제 봉투 판매 수량 제한', imgUrl: '', content: '봉투 판매 수량을 1인당 최대 2개로 제한합니다.' },
  { id: 4, tag: '주간', title: '종량제 봉투 판매 수량 제한', imgUrl: '', content: '봉투 판매 수량을 1인당 최대 2개로 제한합니다.' },
];

const HomePage = () => {
  const { checkedIds, toggleCheck } = useAnnouncementChecks();
  const { isOpen, selectedItem, open, close } = useBottomSheet<Announcement>();

  return (
    <div className="flex min-h-screen flex-col gap-3 bg-lightgray p-6.25">
      <h1 className="text-title1 font-bold text-black">홈</h1>
      {MOCK_ANNOUNCEMENTS.map((item) => (
        <AnnouncementItem
          key={item.id}
          id={item.id}
          tag={item.tag}
          title={item.title}
          isChecked={checkedIds.includes(item.id)}
          onClick={() => open(item)}
          onCheckClick={() => toggleCheck(item.id)}
        />
      ))}
      <AnnouncementBottomSheet
        open={isOpen}
        onClose={close}
        onDelete={close}
        announcement={selectedItem}
      />
    </div>
  );
};

export default HomePage;
