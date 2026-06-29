import {
  Children,
  isValidElement,
  type ReactElement,
  type ReactNode,
  useEffect,
  useState,
} from 'react';

const FUNNEL_STATE_KEY = 'funnel';

interface UseFunnelOptions {
  onComplete?: () => void;
}

interface StepProps<Name extends string = string> {
  name: Name;
  children: ReactNode;
}

interface FunnelProps<Name extends string = string> {
  currentStep: Name;
  children: ReactElement<StepProps<Name>>[];
}

const Step = <Name extends string>({ children }: StepProps<Name>) => {
  return <>{children}</>;
};

const Funnel = <Name extends string>({
  currentStep,
  children,
}: FunnelProps<Name>) => {
  const targetStep = Children.toArray(children).find((child) => {
    if (!isValidElement<StepProps<Name>>(child)) {
      return false;
    }
    return child.props.name === currentStep;
  });
  return <>{targetStep}</>;
};

const isValidStep = <Steps extends readonly string[]>(
  candidate: unknown,
  steps: Steps,
): candidate is Steps[number] => {
  return (
    typeof candidate === 'string' &&
    (steps as readonly string[]).includes(candidate)
  );
};

const getFunnelStepFromHistory = (): unknown => {
  return window.history.state?.[FUNNEL_STATE_KEY]?.step;
};

const writeFunnelStepToHistory = (
  step: string,
  mode: 'push' | 'replace',
) => {
  const nextState = {
    ...window.history.state,
    [FUNNEL_STATE_KEY]: { step },
  };
  if (mode === 'push') {
    window.history.pushState(nextState, '');
  } else {
    window.history.replaceState(nextState, '');
  }
};

const useFunnel = <Steps extends readonly [string, ...string[]]>(steps: Steps, options?: UseFunnelOptions) => {
  type StepName = Steps[number];

  const [currentStep, setCurrentStep] = useState<StepName>(() => {
    const stored = getFunnelStepFromHistory();
    return isValidStep(stored, steps) ? stored : steps[0];
  });
  const currentStepIndex = steps.indexOf(currentStep);

  useEffect(() => {
    if (!isValidStep(getFunnelStepFromHistory(), steps)) {
      writeFunnelStepToHistory(steps[0], 'replace');
    }
  }, [steps]);

  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      const candidate = event.state?.[FUNNEL_STATE_KEY]?.step;
      if (isValidStep(candidate, steps)) {
        setCurrentStep(candidate);
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [steps]);

  const goToNextStep = () => {
    const nextStep = steps[currentStepIndex + 1] as StepName | undefined;
    if (nextStep) {
      writeFunnelStepToHistory(nextStep, 'push');
      setCurrentStep(nextStep);
    } else {
      options?.onComplete?.();
    }
  };

  const goToPrevStep = () => {
    if (currentStepIndex > 0) {
      window.history.back();
    }
  };

  const canGoPrev = currentStepIndex > 0;
  const canGoNext = currentStepIndex < steps.length - 1;

  return {
    Funnel: Funnel as (props: FunnelProps<StepName>) => ReactElement,
    Step: Step as (props: StepProps<StepName>) => ReactElement,
    goToNextStep,
    goToPrevStep,
    currentStep,
    canGoPrev,
    canGoNext,
  };
};

export default useFunnel;
