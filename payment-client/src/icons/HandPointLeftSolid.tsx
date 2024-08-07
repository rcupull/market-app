import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgHandPointLeftSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M16.906 3C15.29 3 14 4.23 14 5.656c0 1.336.469 2.328.938 2.969.292.402.421.469.624.625l.188.75H5c-1.645 0-3 1.355-3 3s1.355 3 3 3h3.563l1.656 7.625A3.016 3.016 0 0013.156 26H30V10h-5.594l-6.781-6.719L17.312 3zm-.312 2.094L23 11.406V24h-9.844c-.476 0-.898-.313-1-.781l-1.781-8.438-.188-.781H5c-.566 0-1-.434-1-1 0-.566.434-1 1-1h13.344l-.313-1.25-.593-2.25-.125-.406-.344-.188s-.18-.086-.438-.437c-.258-.352-.531-.91-.531-1.813 0-.308.172-.48.594-.562zM25 12h3v12h-3z'
    })
  );
}
export default SvgHandPointLeftSolid;
