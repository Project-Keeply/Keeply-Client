interface TagButtonProps {
  lavbel: string;
  isSelected: boolean;
  onClick: () => void;
}

const TagButton = ({ label, isSelected, onClick }: TagButtonProps) => {
  return (
    <div>
      <button>
        {label}
      </button>
    </div>
  )
}

export default TagButton
