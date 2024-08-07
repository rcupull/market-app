import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgCodiepie(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M16.043 3c-7.18 0-13 5.82-13 13s5.82 13 13 13c5.434 0 9.973-3.336 11.916-8.07L17.125 16l10.533-5.809C25.524 5.931 21.132 3 16.043 3zm0 2c3.534 0 6.77 1.666 8.824 4.447l-3.582 1.975A6.967 6.967 0 0016 9a7 7 0 100 14 6.967 6.967 0 005.568-2.781l3.66 1.666C23.248 25.044 19.814 27 16.044 27c-6.065 0-11-4.935-11-11s4.934-11 11-11zM24 13v5h2v-2h.5a1.5 1.5 0 000-3H24z'
    })
  );
}
export default SvgCodiepie;
