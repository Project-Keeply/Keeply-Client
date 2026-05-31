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
    isChecked: false,
  },
  {
    id: 2,
    imgUrl: 'https://placehold.co/600x400',
    tag: '주간',
    title: '신상품 입고 안내',
    content:
      '새로운 종량제 봉투가 입고되었습니다. 환경을 생각하는 선택, 지금 바로 만나보세요!',
    isChecked: false,
  },
];

const HomePage = () => {
  const [announcements, setAnnouncements] =
    useState<Announcement[]>(MOCK_ANNOUNCEMENTS);
  const {
    isOpen,
    selectedItem: selectedAnnouncement,
    handleItemClick,
    handleClose,
  } = useBottomSheet<Announcement>();

  const handleDelete = () => {
    handleClose();
  };

  const handleCheckToggle = (id: number) => {
    setAnnouncements((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isChecked: !item.isChecked } : item,
      ),
    );
  };

  return (
    <div className="flex flex-1 flex-col gap-4 p-10 bg-lightgray">
      {announcements.map((item) => (
        <CheckButton
          key={item.id}
          size="sm"
          hasBackground={false}
          isChecked={item.isChecked}
          onClick={() => handleItemClick(item)}
          onCheckClick={() => handleCheckToggle(item.id)}
        >
          {item.title}
        </CheckButton>
      ))}
      {selectedAnnouncement && (
        <AnnouncementBottomSheet
          open={isOpen}
          onClose={handleClose}
          onDelete={handleDelete}
          announcement={selectedAnnouncement}
        />
      )}
    </div>
  );
};

export default HomePage;
