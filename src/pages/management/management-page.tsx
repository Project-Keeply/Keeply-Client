import { CommonHeader, ItemCard } from '@shared/components';

import {
  DisposalBottomSheet,
  DisposalList,
  useDisposalList,
} from '@/entities/disposal';
import { useMyGroup } from '@/entities/group';

const ManagementPage = () => {
  const { groupId } = useMyGroup();
  const {
    sortedItems,
    selectedItem,
    isOpen,
    isCompleting,
    handleCardClick,
    handleClose,
    handleComplete,
  } = useDisposalList(groupId);

  return (
    <>
      <CommonHeader title="폐기 관리" isSticky />
      <DisposalList items={sortedItems} onCardClick={handleCardClick} />
      <DisposalBottomSheet
        open={isOpen}
        onClose={handleClose}
        onComplete={handleComplete}
        isCompleting={isCompleting}
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
