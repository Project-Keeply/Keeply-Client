import Button from '@shared/components/Button';
import type { ReactNode } from 'react';

import { IcLogo } from '@/shared/icons';

interface OnboardingLayoutProps {
  title: string;
  children: ReactNode;
  ctaLabel: string;
  onCtaClick: () => void;
  isCtaDisabled?: boolean;
  secondaryCta?: {
    label?: string;
    onClick: () => void;
  };
}

const OnboardingLayout = ({
  title,
  children,
  ctaLabel,
  onCtaClick,
  isCtaDisabled,
  secondaryCta,
}: OnboardingLayoutProps) => {
  return (
    <div className="mx-auto flex h-[100dvh] max-w-[430px] flex-col bg-white pb-[env(safe-area-inset-bottom)] pl-[env(safe-area-inset-left)] pr-[env(safe-area-inset-right)] pt-[env(safe-area-inset-top)]">
      <header className="flex items-center px-5 py-[40px]">
        <IcLogo className="h-[47px] w-auto" />
      </header>

      <div className="min-h-0 flex-1 overflow-y-auto px-5 pt-6">
        <h1 className="text-headline2 mb-6 pb-[45px] font-semibold whitespace-pre-line leading-[1.4]">
          {title}
        </h1>
        {children}
      </div>

      <div className="shrink-0 px-5 py-10">
        {secondaryCta ? (
          <div className="flex gap-3">
            <Button
              variant="secondary"
              size="large"
              onClick={secondaryCta.onClick}
              className="flex-1"
            >
              {secondaryCta.label ?? '이전'}
            </Button>
            <Button
              variant="primary"
              size="large"
              onClick={onCtaClick}
              disabled={isCtaDisabled}
              className="flex-1"
            >
              {ctaLabel}
            </Button>
          </div>
        ) : (
          <Button
            variant="primary"
            size="large"
            onClick={onCtaClick}
            disabled={isCtaDisabled}
            className="w-full"
          >
            {ctaLabel}
          </Button>
        )}
      </div>
    </div>
  );
};

export default OnboardingLayout;
