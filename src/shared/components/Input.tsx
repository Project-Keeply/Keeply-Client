interface InputProps {
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
}

const Input = ({ value, placeholder, onChange }: InputProps) => {
  const isFilled = value.length > 0;
  return (
    <div className={`w-full border-0 border-b-2 focus-within:border-primary-500 ${isFilled ? 'border-primary-500' : 'border-gray-200'}`}>
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-transparent outline-none placeholder:text-gray-200 text-title1 font-normal pb-2"
      />
    </div>
  )
}

export default Input
