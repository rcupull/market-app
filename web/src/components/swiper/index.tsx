import { useEffect, useState } from 'react';
import {
  Swiper as SwiperBase,
  SwiperClass,
  SwiperProps as SwiperPropsBase,
  SwiperSlide,
} from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import { Autoplay, Navigation } from 'swiper/modules';
import { StyleProps } from 'types/general';
import { cn, isNumber } from 'utils/general';
interface SwiperItem {
  content: React.ReactNode;
}

export interface SwiperProps extends SwiperPropsBase, StyleProps {
  items?: Array<SwiperItem>;
  activeIndex?: number;
}
export const Swiper = ({ items, className, activeIndex, ...omittedProps }: SwiperProps) => {
  const [swiper, setSwiper] = useState<SwiperClass>();

  useEffect(() => {
    if (isNumber(activeIndex)) {
      swiper?.slideTo(activeIndex);
    }
  }, [activeIndex]);

  return (
    <SwiperBase
      modules={[Navigation, Autoplay]}
      spaceBetween={50}
      slidesPerView={1}
      navigation
      onSwiper={(swiper) => setSwiper(swiper)}
      className={cn('w-full', className)}
      {...omittedProps}
    >
      {items?.map(({ content }, index) => {
        return (
          <SwiperSlide
            key={index}
            className={cn({
              //fixing soome bugs in the slide's width when slidesPerView=auto
              '!w-auto': omittedProps.slidesPerView == 'auto',
            })}
          >
            {content}
          </SwiperSlide>
        );
      })}
    </SwiperBase>
  );
};
