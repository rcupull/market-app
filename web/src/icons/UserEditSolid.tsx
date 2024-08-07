import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgUserEditSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M13 3c-3.855 0-7 3.145-7 7 0 2.41 1.23 4.55 3.094 5.813C5.527 17.343 3 20.883 3 25h2c0-4.43 3.57-8 8-8 2.145 0 4.063.879 5.5 2.25l-4.719 4.719-.062.312-.688 3.532-.312 1.468 1.469-.312 3.53-.688.313-.062 10.094-10.094c1.16-1.16 1.16-3.09 0-4.25a3.018 3.018 0 00-4.219-.031l-3.968 3.969a10.103 10.103 0 00-3.032-2A7.024 7.024 0 0020 10c0-3.855-3.145-7-7-7zm0 2c2.773 0 5 2.227 5 5s-2.227 5-5 5-5-2.227-5-5 2.227-5 5-5zm13 10c.254 0 .52.082.719.281a.977.977 0 010 1.406l-9.688 9.688-1.781.375.375-1.781 9.688-9.688c.199-.199.433-.281.687-.281z'
    })
  );
}
export default SvgUserEditSolid;
