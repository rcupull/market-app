import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgSave(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M5 5v22h22V9.594l-.281-.313-4-4L22.406 5zm2 2h3v6h12V7.437l3 3V25h-2v-9H9v9H7zm5 0h4v2h2V7h2v4h-8zm-1 11h10v7H11z'
    })
  );
}
export default SvgSave;
