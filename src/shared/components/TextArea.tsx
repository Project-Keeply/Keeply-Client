import { useId } from 'react';

interface TextAreaProps {
  title: string;
  explanation?: string;
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
}

const TextArea = ({
  title,
  explanation,
  value,
  placeholder,
  onChange,
}: TextAreaProps) => {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="flex items-baseline gap-1.5 pb-5">
        <span className="text-title3 text-gray-800 font-semibold">{title}</span>
        <span className="relative text-body1 font-light text-gray-200">
          {explanation}
          <span className="absolute -top-0.5 -right-2 w-1.5 h-1.5 rounded-full bg-orange-500" />
        </span>
      </label>
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
