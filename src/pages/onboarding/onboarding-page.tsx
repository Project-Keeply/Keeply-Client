import { ROUTE_PATH } from '@shared/router/path';
import { useNavigate } from 'react-router';

import { OnboardingFunnel } from '@/features/onboarding';

const OnboardingPage = () => {
  const navigate = useNavigate();

  const handleOnboardingSuccess = () => {
    // TODO: welcome 페이지 구현 후 ROUTE_PATH.ONBOARDING_WELCOME 으로 변경
    navigate(ROUTE_PATH.HOME, { replace: true });
  };

  return <OnboardingFunnel onSuccess={handleOnboardingSuccess} />;
};

export default OnboardingPage;
