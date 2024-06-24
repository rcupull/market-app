import { SwiperProps } from 'components/swiper';

import { useBreakpoints } from 'hooks/useBreakpoints';

import { PostCardLayout } from 'types/business';
import { breakpointsSwitch } from 'utils/view';

export const useSwiperProps = ({
  layout,
}: {
  layout: PostCardLayout | undefined;
}): Pick<SwiperProps, 'slidesPerView' | 'spaceBetween'> => {
  const size = layout?.size;

  const breakpoints = useBreakpoints({ sweep: true });

  const getSlidesPerView = (): SwiperProps['slidesPerView'] => {
    switch (size) {
      case 'small':
        return breakpointsSwitch({
          breakpoints,
          values: {
            xs: 4,
            sm: 6,
            md: 7,
            lg: 9,
            xl: 8,
          },
        });
      case 'medium':
        return breakpointsSwitch({
          breakpoints,
          values: {
            xs: 2,
            sm: 3,
            md: 4,
            xl: 5,
          },
        });
      case 'long':
        return breakpointsSwitch({
          breakpoints,
          values: {
            xs: 1,
            sm: 2,
            md: 3,
            lg: 4,
          },
        });
    }
  };

  return {
    slidesPerView: getSlidesPerView(),
    spaceBetween: 10,
  };
};
