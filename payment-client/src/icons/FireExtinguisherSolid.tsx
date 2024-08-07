import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgFireExtinguisherSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M16 4c-1.293 0-2.395.844-2.813 2H12c-2.746 0-5 2.254-5 5h2a3 3 0 013-3h1v2.469c-.32.238-.734.578-1.219 1.062C10.953 12.36 10 13.5 10 15v13h12V15c0-1.5-.953-2.64-1.781-3.469A11.035 11.035 0 0019 10.47v-.281l4.844.812 1.156.188V4.811L23.844 5l-5.094.844C18.293 4.77 17.234 4 16 4zm0 2c.555 0 1 .445 1 1v3h-2V7c0-.555.445-1 1-1zm7 1.188v1.625l-4-.688v-.25zM14.375 12h3.25c.152.105.578.39 1.156.969C19.453 13.64 20 14.5 20 15v11h-8V15c0-.5.547-1.36 1.219-2.031.578-.578 1.004-.864 1.156-.969zM14 17v2h4v-2z'
    })
  );
}
export default SvgFireExtinguisherSolid;
