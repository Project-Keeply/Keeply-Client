import kakaoLoginButton from '@shared/assets/images/login/kakao-login-button.svg';

import { getKakaoAuthUrl } from '../utils/kakao-auth';

const KakaoLoginButton = () => {
  const handleKakaoLoginClick = () => {
    window.location.href = getKakaoAuthUrl();
  };

  return (
    <button
      type="button"
      onClick={handleKakaoLoginClick}
      className="w-full cursor-pointer"
    >
      <img src={kakaoLoginButton} alt="카카오 로그인" className="w-full" />
    </button>
  );
};

export default KakaoLoginButton;
