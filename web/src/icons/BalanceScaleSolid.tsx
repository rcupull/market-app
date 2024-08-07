import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgBalanceScaleSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M16 5c-1.293 0-2.395.844-2.813 2H6v2h1.406l-.281.5-4 7-.125.25V17c0 2.75 2.25 5 5 5s5-2.25 5-5v-.25l-.125-.25-4-7-.281-.5h4.594A3.016 3.016 0 0015 10.813V24h-4v2h10v-2h-4V10.812A3.036 3.036 0 0018.813 9h4.593l-.281.5-4 7-.125.25V17c0 2.75 2.25 5 5 5s5-2.25 5-5v-.25l-.125-.25-4-7-.281-.5H26V7h-7.188C18.395 5.844 17.294 5 16 5zm0 2c.563 0 1 .438 1 1 0 .563-.438 1-1 1-.563 0-1-.438-1-1 0-.563.438-1 1-1zm-8 5.031L10.281 16H5.72zm16 0L26.281 16H21.72zM5.25 18h5.5c-.402 1.16-1.445 2-2.75 2s-2.348-.84-2.75-2zm16 0h5.5c-.402 1.16-1.445 2-2.75 2s-2.348-.84-2.75-2z'
    })
  );
}
export default SvgBalanceScaleSolid;
