import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgCommentMedicalSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M3 6v20h9.586L16 29.414 19.414 26H29V6H3zm2 2h22v16h-8.414L16 26.586 13.414 24H5V8zm10 3v4h-4v2h4v4h2v-4h4v-2h-4v-4h-2z'
    })
  );
}
export default SvgCommentMedicalSolid;
