import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgFileVideo(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M6 3v26h20V9.594l-.281-.313-6-6L19.406 3zm2 2h10v6h6v16H8zm12 1.438L22.563 9H20zm-7 6.78v9.563l1.5-.937 5-3L20.938 18l-1.438-.844-5-3zm2 3.532L17.094 18 15 19.25z'
    })
  );
}
export default SvgFileVideo;
