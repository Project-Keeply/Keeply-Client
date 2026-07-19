import { Children, isValidElement, type ReactNode } from 'react';

interface StepProps<Name extends string = string> {
  name: Name;
  children: ReactNode;
}

interface FunnelProps<Name extends string = string> {
  currentStep: Name;
  children: ReactNode;
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

export { Funnel, Step };
export type { FunnelProps, StepProps };
