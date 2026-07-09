import useFunnel from '@shared/hooks/use-funnel';
import { FormProvider, useForm, useWatch } from 'react-hook-form';

import { useOnboarding } from '../hooks/use-onboarding';
import { BrandStep, RoleStep, StoreNameStep, WorkspaceCodeStep } from './steps';

import {
  ONBOARDING_ROLE,
  ONBOARDING_STEP,
  PART_TIMER_STEPS,
  STORE_MANAGER_STEPS,
} from '@/features/onboarding/constants';
import type { OnboardingFormDraft } from '@/features/onboarding/schemas';
import { onboardingSchema } from '@/features/onboarding/schemas';

interface OnboardingFunnelProps {
  onSuccess: () => void;
}

const OnboardingFunnel = ({ onSuccess }: OnboardingFunnelProps) => {
  const methods = useForm<OnboardingFormDraft>({
    defaultValues: {
      role: undefined,
      workspaceCode: '',
      brand: undefined,
      storeName: '',
    },
    mode: 'onChange',
  });

  const role = useWatch({ control: methods.control, name: 'role' });
  const steps =
    role === ONBOARDING_ROLE.STORE_MANAGER
      ? STORE_MANAGER_STEPS
      : PART_TIMER_STEPS;

  const { mutate: submitOnboarding } = useOnboarding({ onSuccess });

  const { Funnel, Step, currentStep, goToNextStep, goToPrevStep } = useFunnel(
    steps,
    {
      onComplete: () => {
        const result = onboardingSchema.safeParse(methods.getValues());
        if (!result.success) {
          return;
        }
        submitOnboarding(result.data);
      },
    },
  );

  return (
    <FormProvider {...methods}>
      <Funnel currentStep={currentStep}>
        <Step name={ONBOARDING_STEP.ROLE}>
          <RoleStep onNext={goToNextStep} />
        </Step>
        <Step name={ONBOARDING_STEP.WORKSPACE_CODE}>
          <WorkspaceCodeStep onNext={goToNextStep} onPrev={goToPrevStep} />
        </Step>
        <Step name={ONBOARDING_STEP.BRAND}>
          <BrandStep onNext={goToNextStep} onPrev={goToPrevStep} />
        </Step>
        <Step name={ONBOARDING_STEP.STORE_NAME}>
          <StoreNameStep onNext={goToNextStep} onPrev={goToPrevStep} />
        </Step>
      </Funnel>
    </FormProvider>
  );
};

export default OnboardingFunnel;
