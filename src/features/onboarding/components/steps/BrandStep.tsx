import { CheckButton } from '@shared/components';
import { useFormContext, useWatch } from 'react-hook-form';

import OnboardingLayout from '../OnboardingLayout';

import type { Brand } from '@/features/onboarding/constants';
import { BRAND, BRAND_LABEL } from '@/features/onboarding/constants';
import type { OnboardingFormDraft } from '@/features/onboarding/schemas';

interface BrandStepProps {
  onNext: () => void;
  onPrev: () => void;
}

const BRAND_OPTIONS: Brand[] = [
  BRAND.GS25,
  BRAND.CU,
  BRAND.SEVEN_ELEVEN,
  BRAND.EMART24,
];

const BrandStep = ({ onNext, onPrev }: BrandStepProps) => {
  const { control, setValue } = useFormContext<OnboardingFormDraft>();
  const brand = useWatch({ control, name: 'brand' });

  return (
    <OnboardingLayout
      title={'운영중인 브랜드를\n선택해주세요'}
      ctaLabel="다음"
      onCtaClick={onNext}
      isCtaDisabled={!brand}
      showSecondaryCta
      onSecondaryCtaClick={onPrev}
    >
      <div className="flex flex-col gap-3">
        {BRAND_OPTIONS.map((option) => (
          <CheckButton
            key={option}
            hasBackground
            size="sm"
            isChecked={brand === option}
            onClick={() => setValue('brand', option)}
          >
            {BRAND_LABEL[option]}
          </CheckButton>
        ))}
      </div>
    </OnboardingLayout>
  );
};

export default BrandStep;
