import { useState } from 'react';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';

interface BannerCarouselProps {
  images: string[];
}

const BannerCarousel = ({ images }: BannerCarouselProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="relative -mx-6.25 mb-6.25">
      <Swiper
        modules={[Autoplay]}
        loop
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <img src={image} alt="" className="h-[90px] w-full object-cover" />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="absolute bottom-3 right-3 z-10 rounded-full bg-black/50 px-2 py-1 text-body1 text-white">
        {activeIndex + 1} / {images.length}
      </div>
    </div>
  );
};

export default BannerCarousel;
