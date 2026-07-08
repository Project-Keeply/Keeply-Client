import slide1 from '@shared/assets/images/login/slide-1.png';
import slide2 from '@shared/assets/images/login/slide-2.png';
import slide3 from '@shared/assets/images/login/slide-3.png';

export const LOGIN_SLIDES = [
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

export const LOGIN_SLIDE_IMAGES = LOGIN_SLIDES.map((slide) => slide.image);
export const SLIDE_INTERVAL = 3000; // ms, 슬라이드 자동 전환 간격
