import { CommonHeader } from '@shared/components';
import ItemCard from '@shared/components/ItemCard';
import useBottomSheet from '@shared/hooks/use-bottom-sheet';

import { DisposalBottomSheet } from '@/entities/disposal';

interface DisposalItem {
  id: number;
  imgUrl: string;
  tag: string;
  title: string;
  date: string;
}

const MOCK_DISPOSAL_ITEMS: DisposalItem[] = [
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
    tag: '음료',
    title: '스타벅스 카페라떼',
    date: '2026.05.02 16:00 까지',
  },
  {
    id: 3,
    imgUrl: 'https://placehold.co/90x90',
    tag: '음료',
    title: '스타벅스 카페라떼',
    date: '2026.05.02 16:00 까지',
  },
];

const ManagementPage = () => {
  const { isOpen, selectedItem, open, close } =
    useBottomSheet<DisposalItem>();

  const handleComplete = () => {
    close();
  };

  return (
    <>
      <CommonHeader title="폐기관리" showBack={true} />
      <div className="flex flex-col gap-6 p-10">
        {MOCK_DISPOSAL_ITEMS.map((item) => (
          <ItemCard
            key={item.id}
            imgUrl={item.imgUrl}
            tag={item.tag}
            title={item.title}
            date={item.date}
            onClick={() => open(item)}
          />
        ))}
      </div>
      <DisposalBottomSheet
        open={isOpen}
        onClose={close}
        onComplete={handleComplete}
      >
        {selectedItem && (
          <ItemCard
            imgUrl={selectedItem.imgUrl}
            tag={selectedItem.tag}
            title={selectedItem.title}
            date={selectedItem.date}
          />
        )}
      </DisposalBottomSheet>
    </>
  );
};

export default ManagementPage;
