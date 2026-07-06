import { useMemo, useState } from 'react';

import { DISPOSAL_MOCK } from '../configs/disposal-mock';
import type { DisposalItem } from '../types/disposal';

const useDisposalList = () => {
  const [items, setItems] = useState<DisposalItem[]>(DISPOSAL_MOCK);
  const [selectedItem, setSelectedItem] = useState<DisposalItem | null>(null);

  // 유통기한 임박순 정렬
  const sortedItems = useMemo(() =>
    [...items].sort((a, b) =>
      a.expirationDate.localeCompare(b.expirationDate)
    ),
    [items],
  );

  const isOpen = selectedItem !== null;
  const handleCardClick = (item: DisposalItem) => {
    setSelectedItem(item);
  };
  const handleClose = () => {
    setSelectedItem(null);
  }

  const handleComplete = () => {
    setItems((prev) => prev.filter((item) => item.id !== selectedItem?.id));
    setSelectedItem(null);
  }
  return {
    sortedItems,
    selectedItem,
    isOpen,
    handleCardClick,
    handleClose,
    handleComplete,
  }
}

export default useDisposalList;