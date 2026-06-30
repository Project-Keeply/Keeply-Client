import { Input } from '@shared/components';
import { useFormContext, useWatch } from 'react-hook-form';

import OnboardingLayout from '../OnboardingLayout';

import type { OnboardingFormDraft } from '@/features/onboarding/schemas';
import { storeNameSchema } from '@/features/onboarding/schemas';

interface StoreNameStepProps {
  onNext: () => void;
  onPrev: () => void;
}

const StoreNameStep = ({ onNext, onPrev }: StoreNameStepProps) => {
  const { control, setValue } = useFormContext<OnboardingFormDraft>();
  const storeName = useWatch({ control, name: 'storeName' }) ?? '';

  const handleChange = (value: string) => {
    setValue('storeName', value);
  };

  const isValid = storeNameSchema.safeParse(storeName).success;

  return (
    <OnboardingLayout
      title={'매장 별명을 설정해주세요.'}
      ctaLabel="가입 완료"
      onCtaClick={onNext}
      isCtaDisabled={!isValid}
      showSecondaryCta
      onSecondaryCtaClick={onPrev}
    >
      <Input
        value={storeName}
        onChange={handleChange}
        placeholder="GS25 주안 1동점"
      />
    </OnboardingLayout>
  );
};

export default StoreNameStep;
