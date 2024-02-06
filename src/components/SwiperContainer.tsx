import React, { FC } from "react";
import { Swiper } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

type SwiperContainerProps = {
  children: React.ReactNode;
  swiperRef: React.MutableRefObject<SwiperCore | null>;
};

const SwiperContainer: FC<SwiperContainerProps> = ({ children, swiperRef }) => {
  return (
    <Swiper
      className="mySwiper"
      scrollbar={{ draggable: true }}
      modules={[Navigation]}
      onSwiper={(swiper: SwiperCore) => {
        swiperRef.current = swiper;
      }}
      navigation={true}
      breakpoints={{
        300: {
          slidesPerView: 1,
          slidesPerGroup: 1,
          spaceBetween: 20,
        },
        640: {
          slidesPerView: 2,
          slidesPerGroup: 2,
          spaceBetween: 20,
        },
        876: {
          slidesPerView: 3,
          slidesPerGroup: 3,
          spaceBetween: 40,
        },
        1024: {
          slidesPerView: 3,
          slidesPerGroup: 3,
          spaceBetween: 50,
        },
        1440: {
          slidesPerView: 4,
          slidesPerGroup: 4,
          spaceBetween: 50,
        },
        1800: {
          slidesPerView: 6,
          slidesPerGroup: 6,
          spaceBetween: 50,
        },
      }}
    >
      <div className="flex">{children}</div>
    </Swiper>
  );
};

export default SwiperContainer;
