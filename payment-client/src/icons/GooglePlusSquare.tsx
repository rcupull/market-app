import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgGooglePlusSquare(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M5 5v22h22V5H5zm2 2h18v18H7V7zm6.594 4A4.59 4.59 0 009 15.584a4.593 4.593 0 004.594 4.594c2.644 0 4.406-1.857 4.406-4.479 0-.293-.031-.468-.084-.699h-4.322v1.518h2.601c-.104.67-.786 1.972-2.601 1.972-1.563 0-2.842-1.29-2.842-2.894 0-1.605 1.279-2.907 2.842-2.907.89 0 1.49.388 1.826.713l1.248-1.197A4.383 4.383 0 0013.594 11zm6.736 3v1.33H19v1.34h1.33V18h1.34v-1.33H23v-1.34h-1.33V14h-1.34z'
    })
  );
}
export default SvgGooglePlusSquare;
