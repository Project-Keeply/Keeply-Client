import { IcPlus } from '@shared/icons/svgs'

interface FloatingButtonProps {
  onClick: () => void;
}

const FloatingButton = ({ onClick }: FloatingButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="fixed bottom-[100px] right-4 flex h-[50px] w-[50px] items-center justify-center rounded-full bg-primary-500 shadow-lg"
    >
      <IcPlus />
    </button>
  );
};

export default FloatingButton
