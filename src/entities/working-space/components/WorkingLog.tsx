import Tag from '@shared/components/Tag';

interface WorkingLogProps {
  tag: string;
  content: string;
  variant: 'primary' | 'secondary';
}


const WorkingLog = ({ tag, content, variant }: WorkingLogProps) => {
  return (
    <div className="flex items-start gap-5 px-5 pb-5 bg-white">
      <span className="shrink-0">
        <Tag variant={variant} label={tag} />
      </span>
      <p className="text-body2 text-gray-800 leading-8">{content}</p>
    </div>
  );
}
export default WorkingLog;
