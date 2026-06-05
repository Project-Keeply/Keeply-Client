import { Tag } from '@shared/components';
import { IcCheck, IcFillCheck } from '@shared/icons/svgs';

interface AnnouncementItemProps {
  tag: string;
  title: string;
  isChecked?: boolean;
  onClick?: () => void;
  onCheckClick?: () => void;
}

const AnnouncementItem = ({
  tag,
  title,
  isChecked = false,
  onClick,
  onCheckClick,
}: AnnouncementItemProps) => {
  const tagVariant = tag === '주간' ? 'primary' : 'secondary';

  return (
    <div className="flex w-full items-center justify-between rounded-[10px] bg-white px-4.5 py-5">
      <button
        type="button"
        onClick={onClick}
        className="flex flex-1 items-center gap-2.5 text-left"
      >
        <Tag variant={tagVariant} label={tag} />
        <span className="text-body4 pl-2.75 font-medium">{title}</span>
      </button>
      <button
        type="button"
        onClick={onCheckClick}
        aria-label="처리 완료"
        className="cursor-pointer"
      >
        {isChecked ? <IcFillCheck /> : <IcCheck />}
      </button>
    </div>
  );
};

export default AnnouncementItem;
