import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgGrinStarsSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M16 3C8.832 3 3 8.832 3 16s5.832 13 13 13 13-5.832 13-13S23.168 3 16 3zm0 2c6.065 0 11 4.935 11 11s-4.935 11-11 11S5 22.065 5 16 9.935 5 16 5zm-4 5.268l-.875 1.964L9 12.465l1.59 1.428L10.143 16 12 14.93 13.857 16l-.447-2.107L15 12.465l-2.125-.233L12 10.268zm8 0l-.875 1.964-2.125.233 1.59 1.428L18.143 16 20 14.93 21.857 16l-.447-2.107L23 12.465l-2.125-.233L20 10.268zM10.81 19l-1.72 1a8.111 8.111 0 002.02 2.316 7.974 7.974 0 002.761 1.395A7.94 7.94 0 0016 24c2.212 0 4.21-.906 5.658-2.367A8.14 8.14 0 0022.91 20l-1.72-1a5.996 5.996 0 01-6.795 2.783 5.922 5.922 0 01-2.075-1.047A6.066 6.066 0 0110.81 19z'
    })
  );
}
export default SvgGrinStarsSolid;
