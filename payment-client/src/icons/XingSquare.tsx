import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgXingSquare(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M5 5v22h22V5H5zm2 2h18v18H7V7zm12.639 2c-.22 0-.401.13-.551.38-2.908 5.137-4.418 7.794-4.518 7.974l2.889 5.265c.141.25.32.381.56.381h2.04c.27 0 .39-.22.26-.44l-2.858-5.206v-.01l4.496-7.905c.12-.23-.02-.439-.26-.439H19.64zm-8.565 3c-.248 0-.387.198-.258.436l1.37 2.35-2.143 3.769c-.119.218.02.445.258.445h2.023c.208 0 .395-.128.545-.396 1.398-2.45 2.123-3.73 2.182-3.829l-1.389-2.398c-.149-.248-.336-.377-.564-.377h-2.024z'
    })
  );
}
export default SvgXingSquare;
