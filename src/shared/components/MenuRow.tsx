import { IcRightArrow } from '../icons/svgs';

interface MenuRowProps {
  label: string;
  onClick: () => void;
}

const MenuRow = ({ label, onClick }: MenuRowProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center justify-between px-5 py-[18px] text-left cursor-pointer"
    >
      <span className="text-body4 font-medium text-gray-800">{label}</span>
      <IcRightArrow />
    </button>
  );
};

export default MenuRow;
