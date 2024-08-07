import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgGrinHeartsSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M16 4C9.383 4 4 9.383 4 16s5.383 12 12 12 12-5.383 12-12S22.617 4 16 4zm0 2c5.535 0 10 4.465 10 10s-4.465 10-10 10S6 21.535 6 16 10.465 6 16 6zm-5.5 5A1.5 1.5 0 009 12.5c0 .094.008.184.031.281.043.239.14.442.281.625C10.063 14.7 12 16 12 16s3-1.906 3-3.5a1.5 1.5 0 00-3 0 1.5 1.5 0 00-1.5-1.5zm8 0a1.5 1.5 0 00-1.5 1.5c0 .094.008.184.031.281.043.239.14.442.282.625C18.063 14.7 20 16 20 16s1.988-1.29 2.719-2.625c.16-.297.281-.586.281-.875a1.5 1.5 0 00-3 0 1.5 1.5 0 00-1.5-1.5zm-7.688 8l-1.718 1c1.383 2.387 3.953 4 6.906 4s5.523-1.613 6.906-4l-1.718-1A5.977 5.977 0 0116 22a5.977 5.977 0 01-5.188-3z'
    })
  );
}
export default SvgGrinHeartsSolid;
