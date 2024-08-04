import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgAppStoreIos(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M5 5v22h22V5H5zm2 2h18v18H7V7zm8.992 2.01a.289.289 0 00-.224.031c-.154.082-.238.268-.166.422.484 1.132 2.181 5.033 3.601 7.658l1.318-.71c-1.347-2.616-3.684-6.247-4.343-7.266a.306.306 0 00-.186-.135zm-.744 2.254a.869.869 0 00-.875.422l1.514.894a.918.918 0 00-.32-1.223c-.104-.05-.216-.072-.319-.093zm-1 .638l-.812 1.391 1.544.863.782-1.347-1.514-.907zm-.904 1.543l-3.211 5.6 1.513.875 3.211-5.568-1.513-.907zM9 15v2h1.93l1.17-2H9zm5.84 0l-1.15 2h5.08c-.28-.55-.71-1.41-1-2h-2.93zm5.29 0c.25.46.58 1.09.68 1.29.02.02.08.14.1.18l.22.53H23v-2h-2.87zm.495 1.605l-1.316.711.988 1.543 1.027-.586-.699-1.668zm.803 1.926l-.967.516 1.027 2.45c.185.431.68.637 1.092.411a.812.812 0 00.29-1.154l-1.442-2.223zm-11.43.71l-.545 2.605.135.06 1.955-1.77-1.545-.896z'
    })
  );
}
export default SvgAppStoreIos;
