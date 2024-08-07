import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgYandexInternational(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', { d: 'M20.8 1l-5.6 16.2-5-13.2H7l7 18.6V31h3v-9.9L24 1h-3.2z' })
  );
}
export default SvgYandexInternational;
