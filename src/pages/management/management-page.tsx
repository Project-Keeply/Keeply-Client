import { CommonHeader, ItemCard } from '@shared/components';

import {
  DisposalBottomSheet,
  DisposalList,
  useDisposalList,
} from '@/entities/disposal';

const ManagementPage = () => {
  const { sortedItems, selectedItem, isOpen, handleCardClick, handleClose, handleComplete } = useDisposalList();

  return (
    <>
      <CommonHeader title='폐기 관리' isSticky />
      <DisposalList items={sortedItems} onCardClick={handleCardClick} />
      <DisposalBottomSheet
        open={isOpen}
        onClose={handleClose}
        onComplete={handleComplete}
      >
        {selectedItem && (
          <ItemCard
            imgUrl={selectedItem.imgUrl}
            tag={selectedItem.category}
            title={selectedItem.title}
            date={selectedItem.expirationDate}
          />
        )}
      </DisposalBottomSheet>
    </>
  );
};

export default ManagementPage;
