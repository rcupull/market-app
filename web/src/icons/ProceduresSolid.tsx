import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgProceduresSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M17.125.438L14.375 6H9v2h6.625l1.25-2.563L19.719 13 23.5 8H28V6h-5.5l-2.219 2.875L17.125.437zM6.5 11A2.497 2.497 0 004 13.5V28h5v-2h14v2h5V17c0-1.645-1.355-3-3-3H13v.563A3.927 3.927 0 0011 14c-.734 0-1.406.214-2 .563V13.5C9 12.117 7.883 11 6.5 11zm0 2c.215 0 .5.285.5.5V22h19v4h-1v-2H7v2H6V13.5c0-.215.285-.5.5-.5zm4.5 3c1.117 0 2 .883 2 2s-.883 2-2 2-2-.883-2-2 .883-2 2-2zm4 0h10c.555 0 1 .445 1 1v3H15v-4z'
    })
  );
}
export default SvgProceduresSolid;
