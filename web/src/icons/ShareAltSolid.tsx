import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgShareAltSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props,
    },
    createElement('path', {
      d: 'M16 4c-2.145 0-3.883 1.719-3.969 3.844A9.93 9.93 0 006 17c0 .172-.008.36 0 .563-1.184.695-2 1.972-2 3.437 0 2.2 1.8 4 4 4 .574 0 1.129-.121 1.625-.344C11.359 26.113 13.617 27 16 27s4.64-.887 6.375-2.344c.496.223 1.05.344 1.625.344 2.2 0 4-1.8 4-4 0-1.48-.824-2.777-2.031-3.469.015-.16.031-.324.031-.531a9.93 9.93 0 00-6.031-9.156C19.883 5.719 18.145 4 16 4zm0 2c1.117 0 2 .883 2 2s-.883 2-2 2-2-.883-2-2 .883-2 2-2zm-3.531 3.844C13.14 11.117 14.469 12 16 12c1.531 0 2.86-.883 3.531-2.156A7.936 7.936 0 0124 17c-2.2 0-4 1.8-4 4 0 .895.309 1.707.813 2.375A8.069 8.069 0 0116 25a8.069 8.069 0 01-4.813-1.625A3.92 3.92 0 0012 21c0-2.2-1.8-4-4-4a7.936 7.936 0 014.469-7.156zM8 19c1.117 0 2 .883 2 2s-.883 2-2 2-2-.883-2-2 .883-2 2-2zm16 0c1.117 0 2 .883 2 2s-.883 2-2 2-2-.883-2-2 .883-2 2-2z',
    })
  );
}
export default SvgShareAltSolid;
