import {
  Children,
  isValidElement,
  type ReactElement,
  type ReactNode,
  useEffect,
  useState,
} from 'react';
import { useNavigate } from 'react-router';

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

const useFunnel = <Steps extends readonly [string, ...string[]]>(steps: Steps, completePath: string) => {
  type StepName = Steps[number];

  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState<StepName>(steps[0]);
  const currentStepIndex = steps.indexOf(currentStep);

  useEffect(() => {
    if (!window.history.state?.step) {
      window.history.replaceState({ step: steps[0] }, '');
    }
  }, [steps]);

  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      if (event.state?.step) {
        setCurrentStep(event.state.step as StepName);
      } else {
        setCurrentStep(steps[0]);
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [steps]);

  const goToNextStep = () => {
    const nextStep = steps[currentStepIndex + 1] as StepName | undefined;
    if (nextStep) {
      window.history.pushState({ step: nextStep }, '');
      setCurrentStep(nextStep);
    } else {
      navigate(completePath);
    }
  };

  const goToPrevStep = () => {
    const prevStep = steps[currentStepIndex - 1] as StepName | undefined;
    if (prevStep) {
      window.history.pushState({ step: prevStep }, '');
      setCurrentStep(prevStep);
    }
  };

  return {
    Funnel: Funnel as (props: FunnelProps<StepName>) => ReactElement,
    Step: Step as (props: StepProps<StepName>) => ReactElement,
    goToNextStep,
    goToPrevStep,
    currentStep,
    currentStepIndex,
    steps,
  };
};

export default useFunnel;
