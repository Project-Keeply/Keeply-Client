import { useId } from 'react';

import { WritePageTitle } from '@/shared/components';

interface TextAreaProps {
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
}

const TextArea = ({
  value,
  placeholder,
  onChange,
}: TextAreaProps) => {
  const id = useId();
  return (
    <div>
      <WritePageTitle
        title="내용"
        explanation="(상세 내용은 필수 사항이 아닙니다.)"
      />
      <textarea
        id={id}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-40 bg-transparent outline-none placeholder:text-gray-200 text-title3 font-normal pb-2 border-b border-gray-100"
      />
    </div>
  );
};

export default TextArea
