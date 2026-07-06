import { useState } from 'react';

const useWorkingLogWrite = () => {
  const [isWriting, setIsWriting] = useState(false);
  const [content, setContent] = useState('');

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
    if (!isValid) {
      return;
    }
    closeWrite();
  };
  return {
    isWriting,
    content,
    isValid,
    openWrite,
    closeWrite,
    handleContentChange,
    submit,
  };
};

export default useWorkingLogWrite;
