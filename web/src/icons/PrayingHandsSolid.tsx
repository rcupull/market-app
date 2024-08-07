import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgPrayingHandsSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M15 3c-1.645 0-3 1.355-3 3l.016-.164-.985 5.91-1.89 5.172C9.105 16.965 9.062 17 9 17H8v-1H3v13h5v-3h3.926c1.644 0 3.125-.797 4.074-2.035.95 1.238 2.43 2.035 4.074 2.035H24v3h5V16h-5v1h-1c-.063 0-.105-.035-.14-.082l-1.891-5.172-.985-5.91L20 6c0-1.645-1.355-3-3-3-.34 0-.688.066-1 .227A2.19 2.19 0 0015 3zm-.035 2.016c.02.144.035.472.035.984v15.438A3.121 3.121 0 0111.926 24H8v-5h1c.785 0 1.516-.426 1.902-1.11l.04-.074 2.027-5.562L14 6.082V6c0-.55.422-.965.965-.984zm2.07 0c.543.02.965.433.965.984v.082l1.031 6.172 2.028 5.562.039.075A2.191 2.191 0 0023 19h1v5h-3.926A3.121 3.121 0 0117 21.437V6c0-.512.016-.84.035-.984zM5 18h1v9H5zm21 0h1v9h-1z'
    })
  );
}
export default SvgPrayingHandsSolid;
