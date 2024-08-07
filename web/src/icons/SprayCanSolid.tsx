import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgSprayCanSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M12 2v6h2v1.063C9.898 9.5 8.125 12.53 8.125 12.53L8 12.75V30h14V12.75l-.125-.219S20.102 9.5 16 9.062V8h2V2zm12 0c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zM14 4h2v2h-2zm7 0c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zm3 2c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zm-9 5c1.738 0 2.91.48 3.688 1h-7.375c.777-.52 1.949-1 3.687-1zm-5 3h10v14H10zm5 4c-1.645 0-3 1.355-3 3s1.355 3 3 3 3-1.355 3-3-1.355-3-3-3zm0 2c.563 0 1 .438 1 1 0 .563-.438 1-1 1-.563 0-1-.438-1-1 0-.563.438-1 1-1z'
    })
  );
}
export default SvgSprayCanSolid;
