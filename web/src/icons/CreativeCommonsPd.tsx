import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgCreativeCommonsPd(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props,
    },
    createElement('path', {
      d: 'M16 3C8.832 3 3 8.832 3 16s5.832 13 13 13 13-5.832 13-13S23.168 3 16 3zm0 2c6.065 0 11 4.935 11 11 0 1.238-.217 2.425-.596 3.537L14 14.016V14c0-1.103.897-2 2-2s2 .897 2 2h2c0-2.206-1.794-4-4-4a4.004 4.004 0 00-3.908 3.164l-5.684-2.53C8.294 7.279 11.884 5 16 5zM5.596 12.463L12 15.314V18c0 2.206 1.794 4 4 4a4.004 4.004 0 003.908-3.164l5.684 2.53C23.706 24.721 20.116 27 16 27 9.935 27 5 22.065 5 16c0-1.238.217-2.425.596-3.537zM14 16.205L18.033 18H18c0 1.103-.897 2-2 2s-2-.897-2-2v-1.795z',
    })
  );
}
export default SvgCreativeCommonsPd;
