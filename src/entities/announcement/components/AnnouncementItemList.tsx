import { EmptyState } from '@shared/components';
import useBottomSheet from '@shared/hooks/use-bottom-sheet';

import useAnnouncementChecks from '../hooks/use-announcement-checks';
import useDeleteAnnouncement from '../hooks/use-delete-announcement';
import type { Announcement } from '../types/announcement';
import AnnouncementBottomSheet from './AnnouncementBottomSheet';
import AnnouncementItem from './AnnouncementItem';

import { useMyGroup } from '@/entities/group';
import { useUser } from '@/entities/user';

const DAYS = [
  '일요일',
  '월요일',
  '화요일',
  '수요일',
  '목요일',
  '금요일',
  '토요일',
];

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
  const { mutate: deleteAnnouncement, isPending: isDeleting } =
    useDeleteAnnouncement();
  const { user } = useUser();
  const { group } = useMyGroup();

  const handleDelete = () => {
    if (!selectedItem) {
      return;
    }
    deleteAnnouncement(selectedItem.id, { onSuccess: close });
  };

  const canDelete = selectedItem
    ? group.role === 'OWNER' ||
      (user.id !== 0 && selectedItem.authorUserId === user.id)
    : false;

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-end gap-2 pb-2.5">
        <h2 className="text-title1 font-bold text-black">오늘의 공지사항</h2>
        <span className="text-title1 font-bold text-primary-500">
          {items.length}개
        </span>
        <span className="text-body2 font-normal text-gray-300">
          {formatDate(date)}
        </span>
      </div>
      <div className="flex flex-col gap-3">
        {items.length === 0 ? (
          <div className="flex items-center justify-center rounded-[10px] bg-white py-16">
            <EmptyState message="등록된 공지사항이 없어요" />
          </div>
        ) : (
          items.map((item) => (
            <AnnouncementItem
              key={item.id}
              tag={item.tag}
              title={item.title}
              isChecked={checkedIds.includes(item.id)}
              onClick={() => open(item)}
              onCheckClick={() => toggleCheck(item.id)}
            />
          ))
        )}
      </div>
      <AnnouncementBottomSheet
        open={isOpen}
        onClose={close}
        onDelete={handleDelete}
        canDelete={canDelete}
        isDeleting={isDeleting}
        announcement={selectedItem}
      />
    </div>
  );
};

export default AnnouncementItemList;
