import { BaseBottomSheet, Button, Tag } from '@shared/components';

import type { Announcement } from '../types/announcement';

interface AnnouncementBottomSheetProps {
  open: boolean;
  onClose: () => void;
  onDelete: () => void;
  canDelete: boolean;
  announcement: Announcement | null;
}

const AnnouncementBottomSheet = ({
  open,
  onClose,
  onDelete,
  canDelete,
  announcement,
}: AnnouncementBottomSheetProps) => {
  return (
    <BaseBottomSheet open={open} onClose={onClose}>
      {announcement && (
        <div className="p-6.25">
          {announcement.imgUrl && (
            <img
              src={announcement.imgUrl}
              alt={announcement.title}
              className="w-full h-[200px] object-cover rounded-[10px] pb-5"
            />
          )}
          <div className="flex flex-col gap-2.5 pb-12.5">
            <div className="flex items-center gap-2.5">
              <Tag variant="primary" label={announcement.tag} />
              <h2 className="text-title3 font-semibold text-black">
                {announcement.title}
              </h2>
            </div>
            {announcement.content && (
              <p className="text-body1 text-black pt-2.5">
                {announcement.content}
              </p>
            )}
          </div>
          <div className="flex gap-2.5">
            {canDelete && (
              <Button onClick={onDelete} variant="secondary" className="flex-1">
                삭제
              </Button>
            )}
            <Button onClick={onClose} variant="primary" className="flex-1">
              닫기
            </Button>
          </div>
        </div>
      )}
    </BaseBottomSheet>
  );
};

export default AnnouncementBottomSheet;
