interface InputProps {
  value: string;
  placeholder?: string;
  type?: 'text' | 'date';
  size?: 'lg' | 'md';
  maxLength?: number;
  onChange: (value: string) => void;
}

const Input = ({
  value,
  placeholder,
  type = 'text',
  size = 'lg',
  maxLength,
  onChange,
}: InputProps) => {
  const isFilled = value.length > 0;
  const isMaxLengthReached =
    maxLength !== undefined && value.length >= maxLength;

  // lg: 온보딩(포커스/입력색 토글) / md: 글쓰기(정적 밑줄, TextArea 와 통일)
  const wrapperStyle = {
    lg: `border-b-2 focus-within:border-primary-500 ${isFilled ? 'border-primary-500' : 'border-gray-200'}`,
    md: 'border-b border-gray-100',
  } as const;

  const textStyle = {
    lg: 'text-title1',
    md: 'text-title3',
  } as const;

  return (
    <div className="w-full">
      <div className={`w-full border-0 ${wrapperStyle[size]}`}>
        <input
          type={type}
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
          className={`w-full bg-transparent outline-none placeholder:text-gray-200 ${textStyle[size]} font-normal pb-2`}
        />
      </div>
      {maxLength !== undefined && (
        <p
          className={`mt-1 text-right text-caption1 ${isMaxLengthReached ? 'text-red-500' : 'text-gray-300'}`}
        >
          {value.length} / {maxLength}
        </p>
      )}
    </div>
  );
};

export default Input;
