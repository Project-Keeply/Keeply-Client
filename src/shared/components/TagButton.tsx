interface TagButtonProps {
  label: string;
  isSelected: boolean;
  onClick: () => void;
}

const TagButton = ({ label, isSelected, onClick }: TagButtonProps) => {
  return (
    <div>
      <button className={`px-7 py-3 rounded-full text-body1 font-medium ${isSelected ? 'bg-primary-500 text-white' : 'bg-gray-200 text-gray-500'}`} onClick={onClick}>
        {label}
      </button>
    </div>
  )
}

export default TagButton
