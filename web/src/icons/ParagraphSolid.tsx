import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgParagraphSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M12 5c-3.3 0-6 2.7-6 6s2.7 6 6 6h4v10h2V7h2v20h2V7h2V5zm0 2h4v8h-4c-2.219 0-4-1.781-4-4 0-2.219 1.781-4 4-4z'
    })
  );
}
export default SvgParagraphSolid;
