import Tag from '@shared/components/Tag';

interface WorkingLogProps {
  tag: string;
  content: string;
}


const WorkingLog = ({ tag, content }: WorkingLogProps) => {
  return (
    <div className='flex items-start gap-5 px-5 py-5 bg-white'>
      <span className="shrink-0">
        <Tag variant="primary" label={tag} />
      </span>
      <p className="text-body2 text-gray-800">{content}</p>
    </div>
  )
}
export default WorkingLog;
