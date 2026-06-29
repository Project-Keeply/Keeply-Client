import { useFormContext, useWatch } from 'react-hook-form';
import { CheckButton } from '@shared/components';

import { ONBOARDING_ROLE } from '@/features/onboarding/constants';
import type { OnboardingFormDraft } from '@/features/onboarding/schemas';

import OnboardingLayout from '../OnboardingLayout';

interface RoleStepProps {
  onNext: () => void;
}

const RoleStep = ({ onNext }: RoleStepProps) => {
  const { control, setValue } = useFormContext<OnboardingFormDraft>();
  const role = useWatch({ control, name: 'role' });

  const handlePartTimerClick = () => {
    setValue('role', ONBOARDING_ROLE.PART_TIMER);
  };

  const handleStoreManagerClick = () => {
    setValue('role', ONBOARDING_ROLE.STORE_MANAGER);
  };

  return (
    <OnboardingLayout
      title={'근무자 유형을\n선택해주세요'}
      ctaLabel="다음"
      onCtaClick={onNext}
      isCtaDisabled={!role}
    >
      <div className="flex flex-col gap-3">
        <CheckButton
          hasBackground
          isChecked={role === ONBOARDING_ROLE.PART_TIMER}
          onClick={handlePartTimerClick}
        >
          알바생
        </CheckButton>
        <CheckButton
          hasBackground
          isChecked={role === ONBOARDING_ROLE.STORE_MANAGER}
          onClick={handleStoreManagerClick}
        >
          점장
        </CheckButton>
      </div>
    </OnboardingLayout>
  );
};

export default RoleStep;
