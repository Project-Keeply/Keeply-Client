import {
  Children,
  isValidElement,
  type ReactElement,
  type ReactNode,
  useEffect,
  useState,
} from 'react';
import { useNavigate } from 'react-router';

interface StepProps {
  name: string;
  children: ReactNode;
}

interface FunnelProps {
  children: ReactElement<StepProps>[];
}

const Step = ({ children }: StepProps) => {
  return <>{children}</>;
};

const useFunnel = (steps: readonly string[], completePath: string) => {
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(steps[0] ?? '');
  const currentStepIndex = steps.indexOf(currentStep);

  useEffect(() => {
    if (!window.history.state?.step) {
      window.history.replaceState({ step: steps[0] }, '');
    }
  }, [steps]);

  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      if (event.state?.step) {
        setCurrentStep(event.state.step);
      } else {
        setCurrentStep(steps[0] ?? '');
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [steps]);

  const goToNextStep = () => {
    const nextStep = steps[currentStepIndex + 1];
    if (nextStep) {
      window.history.pushState({ step: nextStep }, '');
      setCurrentStep(nextStep);
    } else {
      navigate(completePath);
    }
  };

  const goToPrevStep = () => {
    const prevStep = steps[currentStepIndex - 1];
    if (prevStep) {
      window.history.pushState({ step: prevStep }, '');
      setCurrentStep(prevStep);
    }
  };

  const Funnel = ({ children }: FunnelProps) => {
    const targetStep = Children.toArray(children).find((child) => {
      if (!isValidElement<StepProps>(child)) {
        return false;
      }
      return child.props.name === currentStep;
    });
    return <>{targetStep}</>;
  };

  return {
    Funnel,
    Step,
    goToNextStep,
    goToPrevStep,
    currentStep,
    currentStepIndex,
    steps,
  };
};

export default useFunnel;
