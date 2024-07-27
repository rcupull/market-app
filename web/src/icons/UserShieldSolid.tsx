import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgUserShieldSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props,
    },
    createElement('path', {
      d: 'M16 5c-3.9 0-7 3.1-7 7a6.96 6.96 0 003.07 5.813C8.51 19.346 6 22.892 6 27h2c0-4.4 3.6-8 8-8 .341 0 .673-.032 1-.078V23.5c0 5.2 6.8 8.2 7.1 8.3l.4.2.4-.2c.3-.1 7.1-3.1 7.1-8.3V18h-.9c-1.9 0-3-.7-3.9-1.2-.9-.4-1.7-.8-2.7-.8-1 0-1.8.4-2.5.8-.506.282-1.114.622-1.88.87A6.956 6.956 0 0023 12c0-3.9-3.1-7-7-7zm0 2c2.8 0 5 2.2 5 5s-2.2 5-5 5-5-2.2-5-5 2.2-5 5-5zm8.5 11c.5 0 .9.2 1.7.6l.3.1c.8.4 1.9 1 3.5 1.2v3.5c0 3.3-4.3 5.7-5.5 6.3-1.2-.6-5.5-3-5.5-6.3v-3.5c1.7-.2 2.8-.8 3.6-1.2l.3-.1h.2c.6-.5.9-.6 1.4-.6z',
    }),
  );
}
export default SvgUserShieldSolid;
