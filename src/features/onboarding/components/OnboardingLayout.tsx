import type { ReactNode } from 'react';
import Button from '@shared/components/Button';
import { IcLogo } from '@/shared/icons';

interface OnboardingLayoutProps {
  title: string;
  children: ReactNode;
  ctaLabel: string;
  onCtaClick: () => void;
  isCtaDisabled?: boolean;
  showSecondaryCta?: boolean;
  secondaryCtaLabel?: string;
  onSecondaryCtaClick?: () => void;
}

const OnboardingLayout = ({
  title,
  children,
  ctaLabel,
  onCtaClick,
  isCtaDisabled,
  showSecondaryCta,
  secondaryCtaLabel = '이전',
  onSecondaryCtaClick,
}: OnboardingLayoutProps) => {
  return (
    <div className="mx-auto flex h-[100dvh] max-w-[430px] flex-col bg-white pb-[env(safe-area-inset-bottom)] pl-[env(safe-area-inset-left)] pr-[env(safe-area-inset-right)] pt-[env(safe-area-inset-top)]">
      <header className="flex items-center px-5 py-5">
        <IcLogo className="h-[47px] w-auto" />
      </header>

      <div className="flex-1 overflow-y-auto px-5 pt-6">
        <h1 className="text-headline2 mb-6 font-semibold whitespace-pre-line leading-[1.4]">
          {title}
        </h1>
        {children}
      </div>

      <div className="shrink-0 px-5 py-10">
        {showSecondaryCta ? (
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onSecondaryCtaClick}
              className="text-button1 flex-1 cursor-pointer rounded-[10px] bg-gray-200 py-4.5 text-gray-400"
            >
              {secondaryCtaLabel}
            </button>
            <div className="flex-1">
              <Button
                variant="primary"
                onClick={onCtaClick}
                disabled={isCtaDisabled}
              >
                {ctaLabel}
              </Button>
            </div>
          </div>
        ) : (
          <Button
            variant="primary"
            onClick={onCtaClick}
            disabled={isCtaDisabled}
          >
            {ctaLabel}
          </Button>
        )}
      </div>
    </div>
  );
};

export default OnboardingLayout;
