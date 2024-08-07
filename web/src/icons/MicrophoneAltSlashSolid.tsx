import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgMicrophoneAltSlashSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M3.72 2.28L2.28 3.72l9.581 9.583 1.428 1.426 3.973 3.972 1.441 1.444 9.576 9.576 1.442-1.442-9.325-9.324 1.448-1.017C25.306 17.52 28 14.57 28 11c0-3.855-3.145-7-7-7-3.578 0-6.53 2.715-6.938 6.188l-1.007 1.425L3.72 2.28zM21 6c2.773 0 5 2.227 5 5a4.995 4.995 0 01-.813 2.75L18.25 6.812A4.995 4.995 0 0121 6zm-4.188 2.25l6.938 6.938A5.003 5.003 0 0121 16c-2.773 0-5-2.227-5-5 0-1.016.297-1.965.813-2.75zm-6.09 6.662L6 21.594l-.469.687.563.594.812.813-2.625 2.593L5.72 27.72l2.562-2.594L9.656 26.5l.719-.5 6.715-4.72-1.44-1.438-5.744 4.064-1.781-1.843 4.027-5.72-1.43-1.43z'
    })
  );
}
export default SvgMicrophoneAltSlashSolid;
