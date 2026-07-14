import { useState } from 'react';

import useDeleteWorkLog from './use-delete-work-log';
import useUpdateWorkLog from './use-update-work-log';

import type { WorkingLog } from '@/entities/working-space/types/working-log';

type WorkingLogMode = 'view' | 'edit';

const useWorkingLogItem = (groupId: number) => {
  const [selectedLog, setSelectedLog] = useState<WorkingLog | null>(null);
  const [mode, setMode] = useState<WorkingLogMode>('view');
  const [editContent, setEditContent] = useState('');
  const isOpen = selectedLog !== null;

  const { mutate: deleteWorkLog, isPending: isDeleting } =
    useDeleteWorkLog(groupId);
  const { mutate: updateWorkLog, isPending: isUpdating } =
    useUpdateWorkLog(groupId);

  const isEditValid = editContent.trim().length > 0;

  const handleLogClick = (log: WorkingLog) => {
    setSelectedLog(log);
    setMode('view');
  };

  const handleClose = () => {
    setSelectedLog(null);
    setMode('view');
    setEditContent('');
  };

  const handleDelete = () => {
    if (selectedLog === null || isDeleting) {
      return;
    }
    deleteWorkLog(Number(selectedLog.id), {
      onSuccess: handleClose,
    });
  };

  const handleEditClick = () => {
    if (selectedLog === null) {
      return;
    }
    setEditContent(selectedLog.content);
    setMode('edit');
  };

  const handleEditChange = (value: string) => {
    setEditContent(value);
  };

  const handleEditCancel = () => {
    setMode('view');
    setEditContent('');
  };

  const handleSave = () => {
    if (selectedLog === null || !isEditValid || isUpdating) {
      return;
    }
    updateWorkLog(
      { workLogId: Number(selectedLog.id), content: editContent },
      { onSuccess: handleClose },
    );
  };

  return {
    selectedLog,
    isOpen,
    mode,
    editContent,
    isEditValid,
    isDeleting,
    isUpdating,
    handleLogClick,
    handleClose,
    handleDelete,
    handleEditClick,
    handleEditChange,
    handleEditCancel,
    handleSave,
  };
};

export default useWorkingLogItem;
