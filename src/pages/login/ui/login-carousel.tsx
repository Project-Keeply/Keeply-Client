import { useState } from 'react';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';

interface LoginCarouselProps {
  images: string[];
  onActiveIndexChange?: (index: number) => void;
  autoplayDelay?: number;
}

const LoginCarousel = ({
  images,
  onActiveIndexChange,
  autoplayDelay = 3000,
}: LoginCarouselProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const hasMultiple = images.length > 1;

  const handleSlideChange = (index: number) => {
    setActiveIndex(index);
    onActiveIndexChange?.(index);
  };

  return (
    <div className="flex flex-col items-center">
      <Swiper
        modules={[Autoplay]}
        loop={hasMultiple}
        autoplay={
          hasMultiple
            ? { delay: autoplayDelay, disableOnInteraction: false }
            : false
        }
        onSlideChange={(swiper) => handleSlideChange(swiper.realIndex)}
        className="w-full"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <img
              src={image}
              alt=""
              className="mx-auto h-auto w-full max-w-[240px] object-contain"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="mt-8 flex gap-2">
        {images.map((_, index) => (
          <span
            key={index}
            className={`h-2 w-2 rounded-full transition-colors ${
              index === activeIndex ? 'bg-primary-500' : 'bg-gray-200'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default LoginCarousel;
