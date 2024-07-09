import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgSquarespace(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props,
    },
    createElement('path', {
      d: 'M12.941 6a2.39 2.39 0 00-1.7.703l-.01.012-5.82 5.818a4.829 4.829 0 000 6.82 4.84 4.84 0 006.83 0l7.67-7.67c.47-.48.47-1.238 0-1.708a1.2 1.2 0 00-1.7 0l-7.682 7.67c-.94.95-2.47.95-3.41 0-.47-.47-.7-1.082-.7-1.702 0-.62.23-1.239.7-1.709l7.531-7.52A2.418 2.418 0 0012.941 6zm6.116.004c-1.234 0-2.467.47-3.407 1.41l-7.68 7.68c-.47.47-.47 1.23 0 1.7s1.24.47 1.71 0l7.67-7.671c.94-.95 2.47-.95 3.41 0 .24.24.54.352.86.352.3 0 .62-.112.85-.352.47-.47.47-1.239 0-1.709a4.828 4.828 0 00-3.413-1.41zm5.119 5.228a4.817 4.817 0 00-3.416 1.418l-7.67 7.67c-.47.47-.47 1.24 0 1.71a1.2 1.2 0 001.7 0l7.68-7.68c.94-.94 2.47-.94 3.41 0 .94.95.94 2.47 0 3.42l-7.53 7.52c.94.94 2.47.94 3.41 0l5.83-5.82a4.829 4.829 0 00-3.414-8.238zm0 3.625c-.31 0-.62.119-.856.354l-7.67 7.67c-.94.94-2.47.94-3.41 0h-.01a1.202 1.202 0 00-1.7 0 1.22 1.22 0 000 1.709A4.8 4.8 0 0013.94 26a4.8 4.8 0 003.41-1.41l7.68-7.68a1.203 1.203 0 00-.854-2.053z',
    }),
  );
}
export default SvgSquarespace;
