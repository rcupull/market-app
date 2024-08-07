import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgPlayCircle(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M16 4C9.383 4 4 9.383 4 16s5.383 12 12 12 12-5.383 12-12S22.617 4 16 4zm0 2c5.535 0 10 4.465 10 10s-4.465 10-10 10S6 21.535 6 16 10.465 6 16 6zm-4 3.125v13.75L13.5 22l9-5.125L24 16l-1.5-.875-9-5.125zm2 3.438L19.969 16 14 19.438z'
    })
  );
}
export default SvgPlayCircle;
