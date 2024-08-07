import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgCreativeCommonsShare(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M16 3C8.832 3 3 8.832 3 16s5.832 13 13 13 13-5.832 13-13S23.168 3 16 3zm0 2c6.065 0 11 4.935 11 11s-4.935 11-11 11S5 22.065 5 16 9.935 5 16 5zm-6 4v10h4v4h8V13h-4V9h-8zm2 2h4v2h-2v4h-2v-6zm4 4h4v6h-4v-6z'
    })
  );
}
export default SvgCreativeCommonsShare;
