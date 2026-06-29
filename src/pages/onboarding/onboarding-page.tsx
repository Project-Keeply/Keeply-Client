import OnboardingLayout from '@/features/onboarding/components/OnboardingLayout';

const OnboardingPage = () => {
  return (
    <OnboardingLayout
      title={'근무자 유형을 선택해주세요'}
      ctaLabel="가입 완료"
      onCtaClick={() => console.log('CTA clicked')}
      showSecondaryCta
      onSecondaryCtaClick={() => console.log('이전 clicked')}
    >
      <div className="text-body2 text-gray-400">
        step 컴포넌트 자리
      </div>
    </OnboardingLayout>
  );
};

export default OnboardingPage;
