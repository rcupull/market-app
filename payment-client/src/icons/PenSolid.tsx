import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgPenSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M23.906 3.969A4.097 4.097 0 0021 5.188L5.187 21l-.062.313-1.094 5.5-.312 1.468 1.469-.312 5.5-1.094.312-.063L26.813 11a4.075 4.075 0 000-5.813 4.097 4.097 0 00-2.907-1.218zm0 1.906c.504 0 1.012.23 1.5.719.973.972.973 2.027 0 3l-.718.687-2.97-2.969.688-.718c.489-.489.996-.719 1.5-.719zm-3.593 2.844l2.968 2.969L11.188 23.78a6.813 6.813 0 00-2.97-2.968zM6.938 22.438a4.734 4.734 0 012.625 2.625l-3.282.656z'
    })
  );
}
export default SvgPenSolid;
