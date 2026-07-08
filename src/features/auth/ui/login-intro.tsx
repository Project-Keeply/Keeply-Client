import { useState } from 'react';

import {
  LOGIN_SLIDE_IMAGES,
  LOGIN_SLIDES,
  SLIDE_INTERVAL,
} from '../constants/login-slides';
import LoginCarousel from './login-carousel';

const LoginIntro = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
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
  );
};

export default LoginIntro;
