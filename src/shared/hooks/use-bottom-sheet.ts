import { useState } from 'react';

const useBottomSheet = <T>() => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<T | null>(null);

  const open = (item: T) => {
    setSelectedItem(item);
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
  };

  return {
    isOpen,
    selectedItem,
    open,
    close,
  };
};

export default useBottomSheet;
