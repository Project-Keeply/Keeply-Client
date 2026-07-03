interface MenuRowProps {
  label: string;
  onClick: () => void;
}

const MenuRow = ({ label, onClick }: MenuRowProps) => {
  return (
    <button type="button" onClick={onClick}>
      {label}
    </button>
  );
};

export default MenuRow;
