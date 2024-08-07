import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgCommentDots(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M3 5v18h5v5.078L14.352 23H29V5zm2 2h22v14H13.648L10 23.918V21H5zm5 5a1.999 1.999 0 100 4 1.999 1.999 0 100-4zm6 0a1.999 1.999 0 100 4 1.999 1.999 0 100-4zm6 0a1.999 1.999 0 100 4 1.999 1.999 0 100-4z'
    })
  );
}
export default SvgCommentDots;
