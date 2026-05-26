interface InputProps {
  text: string;
  placeholder?: string;
  onChange: (value: string) => void;
}

const Input = ({ text, placeholder, onChange }: InputProps) => {
  const hasText = text.length > 0;
  return (
    <div className={`w-full border-0 border-b-2 border-gray-200 focus-within:border-primary-500 
      ${hasText ? 'border-primary-500' : 'border-gray-200'}`}>
      <input
        type="text"
        value={text}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-transparent outline-none placeholder:text-gray-300 text-title1 font-normal pb-2" 
      />
    </div>
  )
}

export default Input
