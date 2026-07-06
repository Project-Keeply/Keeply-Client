import { Input } from '@shared/components';
import type { FormEvent } from 'react';

interface WorkingLogWriteFormProps {
  content: string;
  isValid: boolean;
  onChange: (value: string) => void;
  onSubmit: () => void;
  onCancel: () => void;
}

const WorkingLogWriteForm = ({
  content,
  isValid,
  onChange,
  onSubmit,
  onCancel,
}: WorkingLogWriteFormProps) => {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form
      className="flex items-center gap-3 px-5 py-2 mb-3 bg-white"
      onSubmit={handleSubmit}
    >
      <Input
        size="md"
        placeholder="근무일지를 입력해주세요"
        value={content}
        onChange={onChange}
      />
      <button
        type="button"
        onClick={onCancel}
        className="shrink-0 text-body2 text-gray-300"
      >
        취소
      </button>
      <button
        type="submit"
        disabled={!isValid}
        className="shrink-0 text-body2 text-primary-500 disabled:opacity-50"
      >
        등록
      </button>
    </form>
  );
};

export default WorkingLogWriteForm;
