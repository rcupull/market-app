import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgItalicSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M11.75 5l-.063.938-.187 3L11.437 10h2l-.874 12h-2l-.063.938-.188 3L10.22 27H20.25l.063-.938.187-3L20.563 22h-2l.875-12h2l.062-.938.188-3L21.78 5zm1.875 2h6l-.063 1h-2l-.062.938-1 14L16.437 24h2l-.062 1h-6l.063-1h2l.062-.938 1-14L15.563 8h-2z'
    })
  );
}
export default SvgItalicSolid;
