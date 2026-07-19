import { useState } from 'react';

import useCreateWorkLog from './use-create-work-log';
import useUpdateWorkLog from './use-update-work-log';

import type { WorkingLog } from '@/entities/working-space/types/working-log';

const useWorkingLogWrite = (groupId: number) => {
  const [isWriting, setIsWriting] = useState(false);
  const [content, setContent] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);

  const { mutate: createWorkLog, isPending: isCreating } =
    useCreateWorkLog(groupId);
  const { mutate: updateWorkLog, isPending: isUpdating } =
    useUpdateWorkLog(groupId);

  const isEditing = editingId !== null;
  const isPending = isCreating || isUpdating;
  const isValid = content.trim().length > 0;

  const openCreate = () => {
    setEditingId(null);
    setContent('');
    setIsWriting(true);
  };

  const openEdit = (log: WorkingLog) => {
    setEditingId(Number(log.id));
    setContent(log.content);
    setIsWriting(true);
  };

  const closeWrite = () => {
    setIsWriting(false);
    setContent('');
    setEditingId(null);
  };

  const handleContentChange = (value: string) => {
    setContent(value);
  };

  const submit = () => {
    if (!isValid || isPending) {
      return;
    }
    if (editingId !== null) {
      updateWorkLog(
        { workLogId: editingId, content },
        { onSuccess: closeWrite },
      );
      return;
    }
    createWorkLog(content, { onSuccess: closeWrite });
  };

  return {
    isWriting,
    isEditing,
    content,
    isValid,
    isPending,
    openCreate,
    openEdit,
    closeWrite,
    handleContentChange,
    submit,
  };
};

export default useWorkingLogWrite;
