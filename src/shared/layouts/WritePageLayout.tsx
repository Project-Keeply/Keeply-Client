import { type ReactNode } from 'react';
import { CommonHeader } from '@shared/components';
import Button from '@shared/components/Button';

interface WritePageLayoutProps {
  title?: string;
  label: string;
  onSubmit: () => void;
  disabled?: boolean;
  children?: ReactNode;
}

const WritePageLayout = ({ title = '글쓰기', label, onSubmit, disabled, children }: WritePageLayoutProps) => {
  return (
    <div className="mx-auto flex flex-col h-[100dvh] max-w-[430px] bg-white pb-[env(safe-area-inset-bottom)] pl-[env(safe-area-inset-left)] pr-[env(safe-area-inset-right)] pt-[env(safe-area-inset-top)]">
      <CommonHeader title={title} showBack />
      <div className="flex-1 overflow-y-auto px-5 pt-6">
        {children}
      </div>
      <div className="shrink-0 px-5 py-10">
        <Button variant="primary" onClick={onSubmit} disabled={disabled}>{label}</Button>
      </div>
    </div>
  );
};

export default WritePageLayout;
