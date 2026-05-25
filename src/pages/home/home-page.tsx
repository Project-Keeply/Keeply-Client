import { useState } from 'react';

import { CheckButton } from '@shared/components';

const ANNOUNCEMENT_ITEMS = ['종량제 봉투 판매 수량 제한', '냉장고 온도 점검 필수', '야간 재고 확인 요망'];
const ONBOARDING_ITEMS = ['알바생', '점장'];

const HomePage = () => {
  const [checkedAnnouncements, setCheckedAnnouncements] = useState<boolean[]>(
    Array(ANNOUNCEMENT_ITEMS.length).fill(false)
  );
  const [selectedOnboarding, setSelectedOnboarding] = useState<number | null>(null);

  const handleAnnouncementClick = (index: number) => {
    setCheckedAnnouncements((prev) => prev.map((v, i) => (i === index ? !v : v)));
  };

  const handleOnboardingClick = (index: number) => {
    setSelectedOnboarding(index);
  };

  return (
    <div className="flex flex-col gap-8 p-4 min-h-screen bg-[#F5F6F8]">
      <section className="flex flex-col gap-2">
        <h2 className="text-title3 font-bold">공지사항용</h2>
        {ANNOUNCEMENT_ITEMS.map((item, index) => (
          <CheckButton
            key={index}
            size="sm"
            isChecked={checkedAnnouncements[index]}
            onClick={() => handleAnnouncementClick(index)}
          >
            {item}
          </CheckButton>
        ))}
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="text-title3 font-bold">온보딩용</h2>
        {ONBOARDING_ITEMS.map((item, index) => (
          <CheckButton
            key={index}
            size="lg"
            hasBackground
            isChecked={selectedOnboarding === index}
            onClick={() => handleOnboardingClick(index)}
          >
            {item}
          </CheckButton>
        ))}
      </section>
    </div>
  );
};

export default HomePage;
