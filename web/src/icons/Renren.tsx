import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgRenren(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props,
    },
    createElement('path', {
      d: 'M7.563 7C3.28 7.719 0 11.45 0 15.938c0 2.23.82 4.265 2.156 5.843 3.172-1.535 5.39-4.988 5.406-9.031zm3 0v5.688c0 4.058 2.226 7.554 5.406 9.093a9.018 9.018 0 01-2.156-5.843c0-2.231.816-4.266 2.156-5.844A9.058 9.058 0 0010.563 7zm5.406 3.094c1.336 1.578 2.219 3.613 2.219 5.844 0 2.23-.883 4.265-2.22 5.843 3.173-1.535 5.454-4.992 5.47-9.031V7c-2.153.363-4.118 1.496-5.47 3.094zM24.438 7v5.688c0 4.058 2.226 7.554 5.406 9.093A9.018 9.018 0 0032 15.938c0-4.489-3.281-8.22-7.563-8.938zM9.063 18.219c-.563 2.336-2.243 4.328-4.344 5.656A9.017 9.017 0 009.062 25a9.017 9.017 0 004.344-1.125c-2.097-1.328-3.781-3.32-4.344-5.656zm13.874 0c-.562 2.336-2.242 4.328-4.343 5.656A9.017 9.017 0 0022.937 25a9.017 9.017 0 004.344-1.125c-2.097-1.328-3.781-3.32-4.343-5.656z',
    })
  );
}
export default SvgRenren;
