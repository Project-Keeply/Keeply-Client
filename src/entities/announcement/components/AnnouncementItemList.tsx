import useBottomSheet from '@shared/hooks/use-bottom-sheet';

import useAnnouncementChecks from '../hooks/use-announcement-checks';
import type { Announcement } from '../types/announcement';
import AnnouncementBottomSheet from './AnnouncementBottomSheet';
import AnnouncementItem from './AnnouncementItem';

const DAYS = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];

const formatDate = (date: Date): string => {
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${month}.${day} ${DAYS[date.getDay()]}`;
};

interface AnnouncementItemListProps {
  date: Date;
  items: Announcement[];
}

const AnnouncementItemList = ({ date, items }: AnnouncementItemListProps) => {
  const { checkedIds, toggleCheck } = useAnnouncementChecks();
  const { isOpen, selectedItem, open, close } = useBottomSheet<Announcement>();

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-end gap-2 pb-2.5">
        <h2 className="text-title1 font-bold text-black">오늘의 공지사항</h2>
        <span className="text-title1 font-bold text-primary-500">{items.length}개</span>
        <span className="text-body2 font-normal text-gray-300">{formatDate(date)}</span>
      </div>
      <div className="flex flex-col gap-3">
        {items.map((item) => (
          <AnnouncementItem
            key={item.id}
            tag={item.tag}
            title={item.title}
            isChecked={checkedIds.includes(item.id)}
            onClick={() => open(item)}
            onCheckClick={() => toggleCheck(item.id)}
          />
        ))}
      </div>
      <AnnouncementBottomSheet
        open={isOpen}
        onClose={close}
        onDelete={close}
        announcement={selectedItem}
      />
    </div>
  );
};

export default AnnouncementItemList;
