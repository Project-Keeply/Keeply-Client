import { BaseBottomSheet, Button } from '@shared/components';
import type { ReactNode } from 'react';

interface DisposalBottomSheetProps {
  open: boolean;
  onClose: () => void;
  onComplete: () => void;
  children: ReactNode;
}

const DisposalBottomSheet = ({
  open,
  onClose,
  onComplete,
  children,
}: DisposalBottomSheetProps) => {
  return (
    <BaseBottomSheet open={open} onClose={onClose}>
      <div className="flex flex-col gap-6 p-6.25">
        {children}
        <Button variant="primary" onClick={onComplete} className="w-full">
          폐기 완료
        </Button>
      </div>
    </BaseBottomSheet>
  );
};

export default DisposalBottomSheet;
