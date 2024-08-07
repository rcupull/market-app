import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgWifiSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M16 7c-5.016 0-9.543 2.082-12.813 5.406l1.407 1.406C7.5 10.852 11.535 9 16 9c4.465 0 8.5 1.852 11.406 4.813l1.407-1.407C25.543 9.082 21.015 7 16 7zm0 5c-3.64 0-6.918 1.52-9.281 3.938l1.406 1.406C10.125 15.289 12.915 14 16 14c3.086 0 5.875 1.29 7.875 3.344l1.406-1.407C22.918 13.52 19.641 12 16 12zm0 5c-2.262 0-4.293.957-5.75 2.469l1.406 1.406A5.986 5.986 0 0116 19c1.71 0 3.25.727 4.344 1.875l1.406-1.406C20.297 17.957 18.262 17 16 17zm0 5c-.883 0-1.668.39-2.219 1L16 25.219 18.219 23c-.551-.61-1.336-1-2.219-1z'
    })
  );
}
export default SvgWifiSolid;
