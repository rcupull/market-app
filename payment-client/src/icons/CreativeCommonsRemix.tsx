import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgCreativeCommonsRemix(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M16 3C8.832 3 3 8.832 3 16s5.832 13 13 13 13-5.832 13-13S23.168 3 16 3zm0 2c6.065 0 11 4.935 11 11s-4.935 11-11 11S5 22.065 5 16 9.935 5 16 5zm-1.502 4L11 10.328v3.625l.064.026-.066.021L8 15.139v3.377L11.002 20 14 18.59v.002l6.502 2.416L24 19.678v-3.623l-3-1.116v-3.521L14.498 9zm5.217 6.527l2.365.88-1.582.6-2.363-.878 1.58-.602zm-4.715.5l5 1.862v1.865l-5-1.858v-1.869zm8 1.1v1.861l-2 .76v-1.861l2-.76z'
    })
  );
}
export default SvgCreativeCommonsRemix;
