import { OnboardingFunnel } from '@/features/onboarding';

const OnboardingPage = () => {
  const handleOnboardingSuccess = () => {
    // TODO: navigate(ROUTE_PATH.ONBOARDING_WELCOME, { replace: true });
    console.log('Onboarding success');
  };

  return <OnboardingFunnel onSuccess={handleOnboardingSuccess} />;
};

export default OnboardingPage;
