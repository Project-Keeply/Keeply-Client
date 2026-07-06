import { ItemCard } from '@shared/components';

import type { DisposalItem } from '../types/disposal';

interface DisposalListProps {
  items: DisposalItem[];
  onCardClick: (item: DisposalItem) => void;
}

const DisposalList = ({ items, onCardClick }: DisposalListProps) => {
  return (
    <ul className="flex flex-col gap-10 px-15 py-4">
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
