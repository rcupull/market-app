import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgRockrms(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M16 3C8.832 3 3 8.832 3 16s5.832 13 13 13 13-5.832 13-13S23.168 3 16 3zm0 2c6.065 0 11 4.935 11 11s-4.935 11-11 11S5 22.065 5 16 9.935 5 16 5zm-.5 3c-.288 0-.564.126-.754.342L8.046 16h2.657l4.77-5.45L19.898 16H15a1 1 0 00-.76 1.65L18.826 23h2.635l-4.287-5H22a1 1 0 00.775-1.63l-6.5-8A.997.997 0 0015.52 8h-.02z'
    })
  );
}
export default SvgRockrms;
