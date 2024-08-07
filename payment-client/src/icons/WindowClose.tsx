import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgWindowClose(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M5 5v22h22V5zm2 2h18v18H7zm4.688 3.313l-1.407 1.406L14.562 16l-4.343 4.344 1.406 1.406 4.344-4.344 4.312 4.313 1.407-1.407L17.375 16l4.25-4.25-1.406-1.406-4.25 4.25z'
    })
  );
}
export default SvgWindowClose;
