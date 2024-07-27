import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgCaretDownSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props,
    },
    createElement('path', {
      d: 'M3.594 12l1.687 1.719 10 10 .719.687.719-.687 10-10L28.406 12zm4.844 2h15.124L16 21.563z',
    }),
  );
}
export default SvgCaretDownSolid;
