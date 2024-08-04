import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgPhoneSlashSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M3.707 2.293L2.293 3.707l7.432 7.432 1.416 1.416 1.85 1.85v.001l15.302 15.301 1.414-1.414-13.906-13.906a13.041 13.041 0 013.332-2.08l2 2c.048.048.126.029.178.072l-.227.22h.762c.576.266 1.12.261 1.687 0h.004v-.001l.014-.004-.014.006h.408l4.534-4.428.037-.047a2.369 2.369 0 000-2.953l-.04-.049-3.242-3.144.06.066a3.104 3.104 0 00-1.644-1 3.195 3.195 0 00-1.857.12c-2.295.795-6.61 2.78-10.648 6.565L3.707 2.293zM22.82 4.971c.347-.016.732.112.961.379l.03.033 3.148 3.054c.106.14.107.286 0 .424l-4.211 4.114c.002-.008-.083.036-.201-.082L19.59 9.936l-.604.228s-2.44.904-4.6 2.809l-1.827-1.828c3.769-3.514 7.86-5.392 9.908-6.1l.013-.004.014-.006c.1-.038.21-.059.326-.064zM8.406 12.65c-2.11 2.604-3.859 5.655-5.215 9.132-.407 1.216-.156 2.479.74 3.524l3.098 3.097c.444.444 1 .666 1.557.666a2.2 2.2 0 001.557-.666l4.101-4.097c.89-.89.89-2.229 0-3.118l-2-2.002c.214-.424.549-1.038.983-1.718l-1.448-1.448a20.349 20.349 0 00-1.66 2.981l-.267.621 2.978 2.98c.068.069.068.223 0 .29L8.73 26.99c-.067.066-.218.066-.286 0L5.4 23.95c-.27-.317-.545-.84-.33-1.487 1.24-3.176 2.834-5.989 4.756-8.395l-1.42-1.418z'
    })
  );
}
export default SvgPhoneSlashSolid;
