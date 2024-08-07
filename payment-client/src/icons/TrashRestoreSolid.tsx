import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgTrashRestoreSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M14 4c-.523 0-1.059.184-1.438.563C12.185 4.94 12 5.476 12 6v1H5v2h1.094L8 27.094l.094.906h15.812l.094-.906L25.906 9H27V7h-7V6c0-.523-.183-1.059-.563-1.438C19.06 4.184 18.523 4 18 4h-4zm0 2h4v1h-4V6zM8.125 9h15.75l-1.781 17H9.906L8.125 9zM16 12l-4 4h3v7h2v-7h3l-4-4z'
    })
  );
}
export default SvgTrashRestoreSolid;
