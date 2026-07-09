import { Input } from '@shared/components';
import { useFormContext, useWatch } from 'react-hook-form';

import OnboardingLayout from '../OnboardingLayout';

import type { OnboardingFormDraft } from '@/features/onboarding/schemas';
import { workspaceCodeSchema } from '@/features/onboarding/schemas';

interface WorkspaceCodeStepProps {
  onNext: () => void;
  onPrev: () => void;
  isPending: boolean;
}

const sanitizeWorkspaceCode = (value: string) => {
  return value
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, '')
    .slice(0, 6);
};

const WorkspaceCodeStep = ({
  onNext,
  onPrev,
  isPending,
}: WorkspaceCodeStepProps) => {
  const { control, setValue } = useFormContext<OnboardingFormDraft>();
  const workspaceCode = useWatch({ control, name: 'workspaceCode' }) ?? '';

  const handleChange = (value: string) => {
    setValue('workspaceCode', sanitizeWorkspaceCode(value));
  };

  const isValid = workspaceCodeSchema.safeParse(workspaceCode).success;

  return (
    <OnboardingLayout
      title={'근무지 코드를 입력해주세요.'}
      ctaLabel="가입 완료"
      onCtaClick={onNext}
      isCtaDisabled={!isValid || isPending}
      secondaryCta={{ onClick: onPrev }}
    >
      <Input value={workspaceCode} onChange={handleChange} />
    </OnboardingLayout>
  );
};

export default WorkspaceCodeStep;
