import { ItemCard } from '@shared/components';

import type { DisposalItem } from '../types/disposal';

interface DisposalListProps {
  items: DisposalItem[];
  onCardClick: (item: DisposalItem) => void;
}

const DisposalList = ({ items, onCardClick }: DisposalListProps) => {
  if (items.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center py-36">
        <p className="text-body2 font-medium text-gray-300">
          등록된 폐기 상품이 없어요
        </p>
      </div>
    );
  }

  return (
    <ul className="flex flex-col gap-5 px-5 py-4">
      {items.map((item) => (
        <li key={item.id}>
          <ItemCard
            imgUrl={item.imgUrl}
            tag={item.category}
            title={item.title}
            date={item.expirationDate}
            onClick={() => onCardClick(item)}
          />
        </li>
      ))}
    </ul>
  );
};

export default DisposalList;
