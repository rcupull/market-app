import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgFillDripSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props,
    },
    createElement('path', {
      d: 'M11.3 3.3L9.9 4.7l1.8 1.8-6.9 6.9a3.017 3.017 0 000 4.3l.1.1 6.3 6.3c1.2 1.2 3.1 1.2 4.3 0l7.6-7.6.7-.7-9.7-9.7-.8-.8-.2-.2-1.8-1.8zm1.8 4.6l7.9 7.9-2.2 2.2H7.899L6.2 16.3c-.4-.4-.4-1.1 0-1.5l6.9-6.9zM25 19.3l-.8 1.2s-.5.8-1.1 1.7c-.3.5-.5.9-.7 1.4-.2.5-.4.8-.4 1.4 0 1.6 1.4 3 3 3s3-1.4 3-3c0-.6-.2-1-.4-1.5s-.5-1-.7-1.4c-.5-.9-1.1-1.7-1.1-1.7l-.8-1.1z',
    })
  );
}
export default SvgFillDripSolid;
