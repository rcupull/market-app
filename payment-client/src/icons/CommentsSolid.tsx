import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgCommentsSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M2 5v16h4v5.094l1.625-1.313L12.344 21H22V5zm2 2h16v12h-8.344l-.281.219L8 21.906V19H4zm20 2v2h4v12h-4v2.906L20.344 23h-7.5l-2.5 2h9.312L26 30.094V25h4V9z'
    })
  );
}
export default SvgCommentsSolid;
