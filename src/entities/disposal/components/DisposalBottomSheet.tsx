import { BaseBottomSheet, Button } from '@shared/components';
import type { ReactNode } from 'react';

interface DisposalBottomSheetProps {
  open: boolean;
  onClose: () => void;
  onComplete: () => void;
  isCompleting?: boolean;
  children: ReactNode;
}

const DisposalBottomSheet = ({
  open,
  onClose,
  onComplete,
  isCompleting = false,
  children,
}: DisposalBottomSheetProps) => {
  return (
    <BaseBottomSheet open={open} onClose={onClose}>
      <div className="flex flex-col gap-6 p-6.25">
        {children}
        <Button
          variant="primary"
          onClick={onComplete}
          disabled={isCompleting}
          className="w-full"
        >
          폐기 완료
        </Button>
      </div>
    </BaseBottomSheet>
  );
};

export default DisposalBottomSheet;
