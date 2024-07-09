import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgSdCardSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props,
    },
    createElement('path', {
      d: 'M9.5 5l-.313.406L6 9.656V27h19V5zm1 2H23v18H8V10.344zM13 9v4h2V9zm3 0v4h2V9zm3 0v4h2V9zm-9 1v4h2v-4z',
    }),
  );
}
export default SvgSdCardSolid;
