interface InputProps {
  value: string;
  placeholder?: string;
  type?: 'text' | 'date';
  size?: 'lg' | 'md';
  disabled?: boolean;
  className?: string;
  inputClassName?: string;
  onChange?: (value: string) => void;
}

const Input = ({
  value,
  placeholder,
  type = 'text',
  size = 'lg',
  disabled = false,
  className,
  inputClassName,
  onChange,
}: InputProps) => {
  const isFilled = value.length > 0;

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
    <div className={`w-full border-0 ${wrapperStyle[size]} ${className ?? ''}`}>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.value)}
        className={`w-full bg-transparent outline-none placeholder:text-gray-200 ${textStyle[size]} font-normal pb-2 disabled:text-gray-800 ${inputClassName ?? ''}`}
      />
    </div>
  )
}

export default Input
