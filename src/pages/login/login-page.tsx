import { useState } from 'react';
import kakaoLoginButton from '@shared/assets/images/login/kakao-login-button.svg';
import slide1 from '@shared/assets/images/login/slide-1.png';
import slide2 from '@shared/assets/images/login/slide-2.png';
import slide3 from '@shared/assets/images/login/slide-3.png';
import { IcLogo } from '@shared/icons';

import LoginCarousel from './ui/login-carousel';

const LOGIN_SLIDES = [
  {
    image: slide1,
    title: (
      <>
        {'알바 공지사항을\n'}
        <span className="text-primary-500 font-semibold">Keeply</span>로
        확인해보세요
      </>
    ),
  },
  {
    image: slide2,
    title: (
      <>
        {'폐기 물품 등록 및 관리를, \n'}
        <span className="text-primary-500 font-semibold">Keeply</span>로 한번에!
      </>
    ),
  },
  {
    image: slide3,
    title: (
      <>
        {'매장 운영 기록,\n'}
        <span className="text-primary-500 font-semibold">Keeply</span>로 한눈에!
      </>
    ),
  },
];

const LOGIN_SLIDE_IMAGES = LOGIN_SLIDES.map((slide) => slide.image);
const SLIDE_INTERVAL = 3000; // ms, 슬라이드 자동 전환 간격

const LoginPage = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleKakaoLoginClick = () => {
    // TODO: 카카오 로그인 API 연동
  };

  return (
    <div className="mx-auto flex h-[100dvh] max-w-[430px] flex-col bg-white pb-[env(safe-area-inset-bottom)] pl-[env(safe-area-inset-left)] pr-[env(safe-area-inset-right)] pt-[env(safe-area-inset-top)]">
      <header className="flex items-center px-5 py-[40px]">
        <IcLogo className="h-[47px] w-auto" />
      </header>

      <div className="flex min-h-0 flex-1 flex-col justify-center px-5">
        <LoginCarousel
          images={LOGIN_SLIDE_IMAGES}
          autoplayDelay={SLIDE_INTERVAL}
          onActiveIndexChange={setActiveIndex}
        />
        <h1 className="text-headline2 mt-10 text-center leading-[1.4] font-normal whitespace-pre-line">
          {LOGIN_SLIDES[activeIndex].title}
        </h1>
      </div>

      <div className="shrink-0 px-5 py-10">
        <button
          type="button"
          onClick={handleKakaoLoginClick}
          className="w-full cursor-pointer"
        >
          <img src={kakaoLoginButton} alt="카카오 로그인" className="w-full" />
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
