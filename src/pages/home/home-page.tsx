import { useState } from 'react';

import { BottomSheet } from '@shared/components';

import ItemCard from '../../shared/components/ItemCard';

const MOCK_ITEMS = [
  {
    id: 1,
    imgUrl: 'https://placehold.co/90x90',
    tag: '음료',
    title: '스타벅스 카페라떼',
    date: '2026.05.02 16:00 까지',
  },
  {
    id: 2,
    imgUrl: 'https://placehold.co/90x90',
    tag: '식품',
    title: '삼각김밥 참치마요',
    date: '2026.05.03 09:00 까지',
  },
];

const HomePage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTitle, setSelectedTitle] = useState('');

  const handleItemClick = (title: string) => {
    setSelectedTitle(title);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div className="flex flex-col gap-4 p-10">
      {MOCK_ITEMS.map((item) => (
        <ItemCard
          onClick={() => handleItemClick(item.title)}
          key={item.id}
          imgUrl={item.imgUrl}
          tag={item.tag}
          title={item.title}
          date={item.date}
        />
      ))}
      <BottomSheet open={isOpen} onClose={handleClose}>
        <div className="flex flex-col gap-4 py-6">
          <h2 className="text-title3 font-semibold">{selectedTitle}</h2>
          <p className="text-body2 text-gray-300">BottomSheet 테스트 콘텐츠</p>
          <button
            type="button"
            onClick={handleClose}
            className="py-3 bg-primary-500 text-white rounded-[10px]"
          >
            닫기
          </button>
        </div>
      </BottomSheet>
    </div>
  );
};

export default HomePage;
