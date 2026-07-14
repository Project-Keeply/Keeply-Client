import { useState } from 'react';

import useCreateWorkLog from './use-create-work-log';

const useWorkingLogWrite = (groupId: number) => {
  const [isWriting, setIsWriting] = useState(false);
  const [content, setContent] = useState('');

  const { mutate, isPending } = useCreateWorkLog(groupId);

  const isValid = content.trim().length > 0;

  const openWrite = () => {
    setIsWriting(true);
  };

  const closeWrite = () => {
    setIsWriting(false);
    setContent('');
  };

  const handleContentChange = (value: string) => {
    setContent(value);
  };

  const submit = () => {
    if (!isValid || isPending) {
      return;
    }
    mutate(content, {
      onSuccess: closeWrite,
    });
  };
  return {
    isWriting,
    content,
    isValid,
    isPending,
    openWrite,
    closeWrite,
    handleContentChange,
    submit,
  };
};

export default useWorkingLogWrite;
