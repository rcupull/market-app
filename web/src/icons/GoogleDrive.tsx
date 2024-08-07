import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgGoogleDrive(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M11.438 5l-.282.469-8 13-.312.5.281.531 4 7 .281.5h17.188l.281-.5 4-7 .281-.531-.312-.5-8-13L20.562 5zm2.343 2h5.656l6.782 11h-5.657zM12 7.906l2.969 4.844L8.03 24.031 5.156 19zm4.156 6.75L18.22 18h-4.125zM12.875 20h13.406l-2.875 5H9.781z'
    })
  );
}
export default SvgGoogleDrive;
