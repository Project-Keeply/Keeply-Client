import { useMemo, useState } from 'react';
import { queryKeys } from '@shared/query/query-keys';
import { useSuspenseQuery } from '@tanstack/react-query';

import { getExpiryItemList } from '../apis/disposal-api';
import type { DisposalItem } from '../types/disposal';
import { convertToDisposalItem } from '../utils/convert-disposal';
import useDeleteDisposal from './use-delete-disposal';

const useDisposalList = (groupId: number) => {
  const { data } = useSuspenseQuery({
    queryKey: queryKeys.disposal.list(groupId),
    queryFn: () => getExpiryItemList(groupId),
  });

  // 유통기한 임박순 정렬
  const sortedItems = useMemo(
    () =>
      (data.content ?? [])
        .map(convertToDisposalItem)
        .sort((a, b) => a.expirationDate.localeCompare(b.expirationDate)),
    [data.content],
  );

  const [selectedItem, setSelectedItem] = useState<DisposalItem | null>(null);
  const isOpen = selectedItem !== null;

  const { mutate: deleteDisposal, isPending: isCompleting } =
    useDeleteDisposal();

  const handleCardClick = (item: DisposalItem) => {
    setSelectedItem(item);
  };
  const handleClose = () => {
    setSelectedItem(null);
  };

  const handleComplete = () => {
    if (selectedItem === null || isCompleting) {
      return;
    }
    deleteDisposal(selectedItem.id, {
      onSuccess: () => setSelectedItem(null),
    });
  };

  return {
    sortedItems,
    selectedItem,
    isOpen,
    isCompleting,
    handleCardClick,
    handleClose,
    handleComplete,
  };
};

export default useDisposalList;
