import { useMemo, useState } from 'react';
import { queryKeys } from '@shared/query/query-keys';
import { useSuspenseQuery } from '@tanstack/react-query';

import { getExpiryItemList } from '../apis/disposal-api';
import type { DisposalItem } from '../types/disposal';
import { convertToDisposalItem } from '../utils/convert-disposal';

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

  const handleCardClick = (item: DisposalItem) => {
    setSelectedItem(item);
  };
  const handleClose = () => {
    setSelectedItem(null);
  };

  const handleComplete = () => {
    // TODO(Phase 4): 폐기 처리 삭제 mutation 연결 (성공 시 목록 invalidate)
    setSelectedItem(null);
  };

  return {
    sortedItems,
    selectedItem,
    isOpen,
    handleCardClick,
    handleClose,
    handleComplete,
  };
};

export default useDisposalList;
