import { type ReactNode } from 'react';
import { CommonHeader } from '@shared/components';

interface DetailPageLayoutProps {
  title?: string;
  showBack?: boolean;
  children?: ReactNode;
}

const DetailPageLayout = ({
  title,
  showBack = true,
  children,
}: DetailPageLayoutProps) => {
  return (
    <div className="mx-auto flex h-[100dvh] max-w-[430px] flex-col bg-white pb-[env(safe-area-inset-bottom)] pl-[env(safe-area-inset-left)] pr-[env(safe-area-inset-right)] pt-[env(safe-area-inset-top)]">
      <CommonHeader title={title} showBack={showBack} />
      <div className="flex-1 overflow-y-auto px-5">{children}</div>
    </div>
  );
};

export default DetailPageLayout;
