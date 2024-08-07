import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgClipboardListSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M16 2c-1.26 0-2.15.89-2.59 2H5v25h22V4h-8.41c-.44-1.11-1.33-2-2.59-2zm0 2c.55 0 1 .45 1 1v1h3v2h-8V6h3V5c0-.55.45-1 1-1zM7 6h3v4h12V6h3v21H7V6zm2 7v2h2v-2H9zm4 0v2h10v-2H13zm-4 4v2h2v-2H9zm4 0v2h10v-2H13zm-4 4v2h2v-2H9zm4 0v2h10v-2H13z'
    })
  );
}
export default SvgClipboardListSolid;
