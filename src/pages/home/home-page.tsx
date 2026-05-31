import { useState } from 'react';
import { CheckButton } from '@shared/components';
import useBottomSheet from '@shared/hooks/use-bottom-sheet';

import type { Announcement } from '@/entities/announcement';
import { AnnouncementBottomSheet } from '@/entities/announcement';

const MOCK_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 1,
    imgUrl: 'https://placehold.co/600x400',
    tag: '주간',
    title: '종량제 봉투 판매 수량 제한',
  },
  {
    id: 2,
    imgUrl: 'https://placehold.co/600x400',
    tag: '주간',
    title: '신상품 입고 안내',
    content:
      '새로운 종량제 봉투가 입고되었습니다. 환경을 생각하는 선택, 지금 바로 만나보세요!',
  },
];

const HomePage = () => {
  const [checkedIds, setCheckedIds] = useState<Set<number>>(new Set());
  const {
    isOpen,
    selectedItem: selectedAnnouncement,
    open,
    close,
  } = useBottomSheet<Announcement>();

  const handleDelete = () => {
    close();
  };

  const handleCheckToggle = (id: number) => {
    setCheckedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div className="flex flex-1 flex-col gap-4 p-10 bg-lightgray">
      {MOCK_ANNOUNCEMENTS.map((item) => (
        <CheckButton
          key={item.id}
          size="sm"
          hasBackground={false}
          isChecked={checkedIds.has(item.id)}
          onClick={() => open(item)}
          onCheckClick={() => handleCheckToggle(item.id)}
        >
          {item.title}
        </CheckButton>
      ))}
      <AnnouncementBottomSheet
        open={isOpen}
        onClose={close}
        onDelete={handleDelete}
        announcement={selectedAnnouncement}
      />
    </div>
  );
};

export default HomePage;
