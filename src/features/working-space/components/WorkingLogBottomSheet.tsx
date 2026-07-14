import { BaseBottomSheet, Button, TextArea } from '@shared/components';
import type { ReactNode } from 'react';

interface WorkingLogBottomSheetProps {
  open: boolean;
  onClose: () => void;
  mode: 'view' | 'edit';
  onEdit: () => void;
  onDelete: () => void;
  isDeleting?: boolean;
  editContent: string;
  isEditValid: boolean;
  onEditChange: (value: string) => void;
  onSave: () => void;
  onEditCancel: () => void;
  isUpdating?: boolean;
  children: ReactNode;
}

const WorkingLogBottomSheet = ({
  open,
  onClose,
  mode,
  onEdit,
  onDelete,
  isDeleting = false,
  editContent,
  isEditValid,
  onEditChange,
  onSave,
  onEditCancel,
  isUpdating = false,
  children,
}: WorkingLogBottomSheetProps) => {
  return (
    <BaseBottomSheet open={open} onClose={onClose}>
      {mode === 'edit' ? (
        <div className="flex min-h-[30vh] flex-col justify-between gap-6 p-6.25">
          <TextArea
            placeholder="근무일지를 입력해주세요"
            value={editContent}
            onChange={onEditChange}
          />
          <div className="flex gap-3">
            <Button
              variant="secondary"
              onClick={onEditCancel}
              className="flex-1"
            >
              취소
            </Button>
            <Button
              variant="primary"
              onClick={onSave}
              disabled={!isEditValid || isUpdating}
              className="flex-1"
            >
              저장
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-6 p-6.25">
          {children}
          <div className="flex gap-3">
            <Button
              variant="secondary"
              onClick={onDelete}
              disabled={isDeleting}
              className="flex-1"
            >
              삭제
            </Button>
            <Button variant="primary" onClick={onEdit} className="flex-1">
              수정
            </Button>
          </div>
        </div>
      )}
    </BaseBottomSheet>
  );
};

export default WorkingLogBottomSheet;
