import { useId } from 'react';

interface TextAreaProps {
  value: string;
  placeholder?: string;
  maxLength?: number;
  onChange: (value: string) => void;
}

const TextArea = ({
  value,
  placeholder,
  maxLength,
  onChange,
}: TextAreaProps) => {
  const id = useId();
  return (
    <div>
      <textarea
        id={id}
        value={value}
        placeholder={placeholder}
        maxLength={maxLength}
        onChange={(e) =>
          onChange(
            maxLength !== undefined
              ? e.target.value.slice(0, maxLength)
              : e.target.value,
          )
        }
        className="w-full h-40 bg-transparent outline-none placeholder:text-gray-200 text-title3 font-normal pb-2 border-b border-gray-100"
      />
      {maxLength !== undefined && (
        <p className="mt-1 text-right text-caption1 text-gray-300">
          {value.length} / {maxLength}
        </p>
      )}
    </div>
  );
};

export default TextArea;
