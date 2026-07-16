import emptyCharacter from '@shared/assets/images/empty-state/character.jpg';

interface EmptyStateProps {
  message: string;
}

const EmptyState = ({ message }: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-1">
      <img src={emptyCharacter} alt="" className="w-[400px]" />
      <p className="text-body2 font-medium text-gray-300">{message}</p>
    </div>
  );
};

export default EmptyState;
