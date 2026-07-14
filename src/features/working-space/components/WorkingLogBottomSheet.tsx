import { BaseBottomSheet, Button } from '@shared/components';
import type { ReactNode } from 'react';

interface WorkingLogBottomSheetProps {
  open: boolean;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
  isDeleting?: boolean;
  children: ReactNode;
}

const WorkingLogBottomSheet = ({
  open,
  onClose,
  onEdit,
  onDelete,
  isDeleting = false,
  children,
}: WorkingLogBottomSheetProps) => {
  return (
    <BaseBottomSheet open={open} onClose={onClose}>
      <div className="flex flex-col gap-6 p-6.25">
        {children}
        <div className="flex gap-3">
          <Button variant="primary" onClick={onEdit} className="flex-1">
            수정
          </Button>
          <Button
            variant="secondary"
            onClick={onDelete}
            disabled={isDeleting}
            className="flex-1"
          >
            삭제
          </Button>
        </div>
      </div>
    </BaseBottomSheet>
  );
};

export default WorkingLogBottomSheet;
