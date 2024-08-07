import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgProductHunt(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M16 3C8.832 3 3 8.832 3 16s5.832 13 13 13 13-5.832 13-13S23.168 3 16 3zm0 2c6.065 0 11 4.935 11 11s-4.935 11-11 11S5 22.065 5 16 9.935 5 16 5zm-3 6v11h2v-4h2.5c1.931 0 3.5-1.569 3.5-3.5S19.431 11 17.5 11H13zm2 2h2.5c.827 0 1.5.673 1.5 1.5s-.673 1.5-1.5 1.5H15v-3z'
    })
  );
}
export default SvgProductHunt;
