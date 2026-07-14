import { useState } from 'react';

import type { WorkingLog } from '@/entities/working-space/types/working-log';

import useDeleteWorkLog from './use-delete-work-log';

const useWorkingLogItem = (groupId: number) => {
  const [selectedLog, setSelectedLog] = useState<WorkingLog | null>(null);
  const isOpen = selectedLog !== null;

  const { mutate: deleteWorkLog, isPending: isDeleting } =
    useDeleteWorkLog(groupId);

  const handleLogClick = (log: WorkingLog) => {
    setSelectedLog(log);
  };

  const handleClose = () => {
    setSelectedLog(null);
  };

  const handleDelete = () => {
    if (selectedLog === null || isDeleting) {
      return;
    }
    deleteWorkLog(Number(selectedLog.id), {
      onSuccess: handleClose,
    });
  };

  return {
    selectedLog,
    isOpen,
    isDeleting,
    handleLogClick,
    handleClose,
    handleDelete,
  };
};

export default useWorkingLogItem;
