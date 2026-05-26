interface TextAreaProps {
  title: string;
  explanation?: string;
  content: string;
  placeholder?: string;
  onChange: (value: string) => void;
}

const TextArea = ({
  title,
  explanation,
  content,
  placeholder,
  onChange,
}: TextAreaProps) => {
  return (
    <>
      <div>
        <div className="flex items-baseline gap-1.5 pb-5">
          <h2 className="text-title3 text-gray-800 font-semibold">{title}</h2>
          <p className="relative text-body1 font-light text-gray-200">
            {explanation}
            <span className="absolute -top-0.5 -right-2 w-1.5 h-1.5 rounded-full bg-orange-500" />
          </p>
        </div>
        <textarea
          value={content}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className="w-full h-40 bg-transparent outline-none placeholder:text-gray-200 text-title3 font-normal pb-2 border-b border-gray-100"
        />
      </div>
    </>
  );
};

export default TextArea
