import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgStickyNote(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M5 5v22h15.406l.313-.281 6-6 .281-.313V5zm2 2h18v12h-6v6H7zm14 14h2.563L21 23.563z'
    })
  );
}
export default SvgStickyNote;
