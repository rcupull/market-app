import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgKissSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M16 3C8.832 3 3 8.832 3 16s5.832 13 13 13 13-5.832 13-13S23.168 3 16 3zm0 2c6.065 0 11 4.935 11 11s-4.935 11-11 11S5 22.065 5 16 9.935 5 16 5zm-4.5 7a1.5 1.5 0 000 3 1.5 1.5 0 000-3zm9 0a1.5 1.5 0 000 3 1.5 1.5 0 000-3zM15 17.008v1.49c.901 0 1.477.415 1.477.63 0 .216-.572.626-1.467.63H15v1.492h.01c.895.003 1.467.414 1.467.629 0 .216-.576.63-1.477.63V24c1.669 0 2.977-.932 2.977-2.121 0-.533-.274-1.006-.713-1.375.44-.369.713-.843.713-1.375 0-1.19-1.308-2.121-2.977-2.121z'
    })
  );
}
export default SvgKissSolid;
