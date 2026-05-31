import { useState } from 'react';

const useBottomSheet = <T>() => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<T | null>(null);

  const handleItemClick = (item: T) => {
    setSelectedItem(item);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setSelectedItem(null);
  };

  return {
    isOpen,
    selectedItem,
    handleItemClick,
    handleClose,
  };
};

export default useBottomSheet;
