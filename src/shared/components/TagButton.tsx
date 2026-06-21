interface TagButtonProps {
  label: string;
  isSelected: boolean;
  onClick: () => void;
}

const TagButton = ({ label, isSelected, onClick }: TagButtonProps) => {
  return (
    <div className="shrink-0">
      <button className={`px-8 py-4 rounded-[5px] text-body1 font-medium ${isSelected ? 'bg-primary-500 text-white' : 'bg-gray-100 text-gray-300'}`} onClick={onClick}>
        {label}
      </button>
    </div>
  )
}

export default TagButton
