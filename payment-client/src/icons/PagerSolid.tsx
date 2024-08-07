import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgPagerSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M7 7c-1.645 0-3 1.355-3 3v12c0 1.645 1.355 3 3 3h18c1.645 0 3-1.355 3-3V10c0-1.645-1.355-3-3-3H7zm0 2h18c.565 0 1 .435 1 1v12c0 .565-.435 1-1 1H7c-.565 0-1-.435-1-1V10c0-.565.435-1 1-1zm1 2v6h12v-6H8zm14 0v2h2v-2h-2zm0 4v2h2v-2h-2zM8 19v2h12v-2H8zm14 0v2h2v-2h-2z'
    })
  );
}
export default SvgPagerSolid;
