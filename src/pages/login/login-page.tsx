import kakaoLoginButton from '@shared/assets/images/login/kakao-login-button.svg';
import slide1 from '@shared/assets/images/login/slide-1.png';
import { IcLogo } from '@shared/icons';

import LoginCarousel from './ui/login-carousel';

const LOGIN_SLIDES = [slide1];

const LoginPage = () => {
  const handleKakaoLoginClick = () => {
    // TODO: 카카오 로그인 API 연동
  };

  return (
    <div className="mx-auto flex h-[100dvh] max-w-[430px] flex-col bg-white pb-[env(safe-area-inset-bottom)] pl-[env(safe-area-inset-left)] pr-[env(safe-area-inset-right)] pt-[env(safe-area-inset-top)]">
      <header className="flex items-center px-5 py-[40px]">
        <IcLogo className="h-[47px] w-auto" />
      </header>

      <div className="flex min-h-0 flex-1 flex-col justify-center px-5">
        <LoginCarousel images={LOGIN_SLIDES} />
        <h1 className="text-headline2 mt-10 text-center leading-[1.4] font-light whitespace-pre-line">
          {'알바 공지사항을\n'}
          <span className="text-primary-500 font-semibold">Keeply</span>로 확인해보세요
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
