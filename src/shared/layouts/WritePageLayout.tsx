import { type ReactNode } from 'react';
import { CommonHeader } from '@shared/components';
import Button from '@shared/components/Button';

interface WritePageLayoutProps {
  label: string;
  onSubmit: () => void;
  children?: ReactNode;
}

const WritePageLayout = ({ label, onSubmit, children }: WritePageLayoutProps) => {
  return (
    <div className="flex flex-col h-[100dvh] bg-white">
      <CommonHeader title="글쓰기" showBack />
      <div className="flex-1 overflow-y-auto px-5 pt-6">
        {children}
      </div>
      <div className="shrink-0 px-5 py-10">
        <Button variant="primary" onClick={onSubmit}>{label}</Button>
      </div>
    </div>
  );
};

export default WritePageLayout;
