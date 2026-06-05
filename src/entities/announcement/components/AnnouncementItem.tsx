import { Tag } from '@shared/components';
import { IcCheck, IcFillCheck } from '@shared/icons/svgs';

interface AnnouncementItemProps {
  tag: '주간' | '일일';
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
        className="flex min-w-0 flex-1 items-center gap-2.5 text-left"
      >
        <span className="shrink-0">
          <Tag variant={tagVariant} label={tag} />
        </span>
        <span className="truncate pl-2.75 text-body4 font-medium">{title}</span>
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
