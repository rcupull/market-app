import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgWaterSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M0 7c0 1.625 1.832 3 4 3 1.188 0 2.262-.418 3-1.059C7.738 9.582 8.813 10 10 10c1.188 0 2.262-.418 3-1.059.738.641 1.813 1.059 3 1.059 1.188 0 2.262-.418 3-1.059.738.641 1.813 1.059 3 1.059 1.188 0 2.262-.418 3-1.059.738.641 1.813 1.059 3 1.059 2.168 0 4-1.375 4-3h-2c0 .305-.758 1-2 1-1.223 0-2-.703-2-1h-2c0 .305-.758 1-2 1-1.223 0-2-.703-2-1h-2c0 .305-.758 1-2 1-1.223 0-2-.703-2-1h-2c0 .305-.754 1-2 1-1.223 0-2-.703-2-1H6c0 .305-.754 1-2 1-1.223 0-2-.703-2-1zm0 8c0 1.625 1.832 3 4 3 1.188 0 2.262-.418 3-1.059.738.641 1.813 1.059 3 1.059 1.188 0 2.262-.418 3-1.059.738.641 1.813 1.059 3 1.059 1.188 0 2.262-.418 3-1.059.738.641 1.813 1.059 3 1.059 1.188 0 2.262-.418 3-1.059.738.641 1.813 1.059 3 1.059 2.168 0 4-1.375 4-3h-2c0 .305-.758 1-2 1-1.223 0-2-.703-2-1h-2c0 .305-.758 1-2 1-1.223 0-2-.703-2-1h-2c0 .305-.758 1-2 1-1.223 0-2-.703-2-1h-2c0 .305-.754 1-2 1-1.223 0-2-.703-2-1H6c0 .305-.754 1-2 1-1.223 0-2-.703-2-1zm0 8c0 1.625 1.832 3 4 3 1.188 0 2.262-.418 3-1.059.738.641 1.813 1.059 3 1.059 1.188 0 2.262-.418 3-1.059.738.641 1.813 1.059 3 1.059 1.188 0 2.262-.418 3-1.059.738.641 1.813 1.059 3 1.059 1.188 0 2.262-.418 3-1.059.738.641 1.813 1.059 3 1.059 2.168 0 4-1.375 4-3h-2c0 .305-.758 1-2 1-1.223 0-2-.703-2-1h-2c0 .305-.758 1-2 1-1.223 0-2-.703-2-1h-2c0 .305-.758 1-2 1-1.223 0-2-.703-2-1h-2c0 .305-.754 1-2 1-1.223 0-2-.703-2-1H6c0 .305-.754 1-2 1-1.223 0-2-.703-2-1z'
    })
  );
}
export default SvgWaterSolid;
