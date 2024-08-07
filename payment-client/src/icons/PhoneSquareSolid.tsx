import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgPhoneSquareSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M5 5v22h22V5H5zm2 2h18v18H7V7zm4.871 2.002c-.49 0-.981.186-1.355.559l-.955.955c-.526.528-.7 1.29-.454 1.986l.043.13c.165.504.552 1.68 1.813 3.548.612.908 1.32 1.757 2.098 2.515l.234.235a16.28 16.28 0 002.521 2.105c1.87 1.261 3.048 1.647 3.551 1.813l.131.045a1.9 1.9 0 001.986-.455l.955-.954c.362-.363.561-.842.561-1.353 0-.512-.199-.995-.56-1.356l-1.15-1.148c-.724-.723-1.986-.723-2.71 0l-1.707 1.707a14.266 14.266 0 01-2.154-1.81l-.25-.25a14.189 14.189 0 01-1.801-2.147l1.707-1.707c.362-.361.56-.845.56-1.356 0-.51-.198-.99-.56-1.353l-1.152-1.15a1.906 1.906 0 00-1.352-.559z'
    })
  );
}
export default SvgPhoneSquareSolid;
