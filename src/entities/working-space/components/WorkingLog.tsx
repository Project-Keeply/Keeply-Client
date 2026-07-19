import Tag from '@shared/components/Tag';

interface WorkingLogProps {
  tag: string;
  content: string;
  variant: 'primary' | 'secondary';
  onClick?: () => void;
}

const WorkingLog = ({ tag, content, variant, onClick }: WorkingLogProps) => {
  const baseClass = 'flex w-full items-start gap-5 px-5 pb-5 bg-white text-left';

  const inner = (
    <>
      <span className="shrink-0">
        <Tag variant={variant} label={tag} />
      </span>
      <p className="text-body2 text-gray-800 leading-8">{content}</p>
    </>
  );

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`${baseClass} cursor-pointer`}
      >
        {inner}
      </button>
    );
  }

  return <div className={baseClass}>{inner}</div>;
};

export default WorkingLog;
