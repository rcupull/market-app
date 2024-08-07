import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgHeartbeatSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M10.781 5C6.492 5 3 8.3 3 12.36c0 .218.02.425.035.64H5.04c-.02-.21-.039-.422-.039-.64C5 9.405 7.594 7 10.781 7c1.457 0 2.848.504 3.918 1.418L16 9.531l1.3-1.113C18.368 7.504 19.759 7 21.22 7 24.406 7 27 9.406 27 12.36c0 5.12-4.824 8.156-8.703 10.597-.887.555-1.664 1.047-2.297 1.512-.633-.465-1.41-.957-2.297-1.512-1.808-1.137-3.82-2.406-5.457-3.957H5.531c1.98 2.41 4.785 4.188 7.11 5.652.972.61 1.808 1.137 2.402 1.602 0 0 .95.738.957.746.004-.008.953-.746.953-.746.594-.465 1.43-.992 2.406-1.602C23.426 22.09 29 18.586 29 12.36 29 8.301 25.508 5 21.219 5c-1.95 0-3.797.68-5.219 1.898C14.578 5.68 12.727 5 10.781 5zm1.188 4.387l-2.336 5.832L9.414 15H3v2h5.586l1.777 1.781 1.668-4.168 3 7 2.07-5.175.282.562h1.887A1.999 1.999 0 0023 16a1.999 1.999 0 00-3.73-1h-.653l-1.719-3.438-1.93 4.825z'
    })
  );
}
export default SvgHeartbeatSolid;
