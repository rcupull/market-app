import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgSwatchbookSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M5 5v18c0 2.206 1.794 4 4 4s4-1.794 4-4V5H5zm2 2h4v4H7V7zm11.9.443l-4.398 4.4v2.827l4.396-4.399 2.83 2.829-7.228 7.228V23c0 .056-.007.108-.008.164l10.065-10.062L18.9 7.443zM7 13h4v4H7v-4zm0 6h4v4c0 1.103-.897 2-2 2s-2-.897-2-2v-4zm13.777 0l-2 2H25v4H14.777l-1.888 1.889c-.042.042-.092.071-.135.111H27v-8h-6.223z'
    })
  );
}
export default SvgSwatchbookSolid;
