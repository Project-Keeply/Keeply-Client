import { IcLogo } from '@shared/icons';

import { KakaoLoginButton, LoginIntro } from '@/features/auth';

const LoginPage = () => {
  return (
    <div className="mx-auto flex h-[100dvh] max-w-[430px] flex-col bg-white pb-[env(safe-area-inset-bottom)] pl-[env(safe-area-inset-left)] pr-[env(safe-area-inset-right)] pt-[env(safe-area-inset-top)]">
      <header className="flex items-center px-5 py-[40px]">
        <IcLogo className="h-[47px] w-auto" />
      </header>

      <LoginIntro />

      <div className="shrink-0 px-5 py-10">
        <KakaoLoginButton />
      </div>
    </div>
  );
};

export default LoginPage;
