import { useEffect } from 'react';
import type { ReactNode } from 'react';

interface BottomSheetProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

const BaseBottomSheet = ({ open, onClose, children }: BottomSheetProps) => {
  useEffect(() => {
    if (!open) {
      return;
    }

    const originalOverflow = document.body.style.overflow;
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleEscape);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleEscape);
    };
  }, [open, onClose]);

  if (!open) {
    return null;
  }

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/50" onClick={onClose} />
      <div
        role="dialog"
        aria-modal="true"
        className="fixed bottom-0 left-0 right-0 z-50 rounded-t-[20px] bg-white"
      >
        {children}
      </div>
    </>
  );
};

export default BaseBottomSheet;
