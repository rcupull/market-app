import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgDraft2Digital(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M15.77 5.05c-2.51.01-4.77.79-6.37 2.04-1.27.85-2.15 2.19-2.35 3.74v.02c-.03.21-.05.43-.05.65 0 1.93 1.57 3.5 3.5 3.5s3.5-1.57 3.5-3.5c0-1.5-.95-2.77-2.27-3.27.26-.05.53-.09.82-.09 1.9 0 3.45 1.51 3.45 3.36 0 2.79-4.71 7.19-10.68 12.77L3.47 26H23v3l7-4-7-4v3h-5.85C21.31 19.6 24 16.43 24 11.84c0-3.86-3.51-6.77-8.18-6.79h-.05zm-.18 2h.2c3.54.01 6.21 2.06 6.21 4.79 0 4.16-2.76 7.06-7.33 11.86l-.28.3H8.53C14.6 18.27 18 14.68 18 11.5c0-1.85-.96-3.48-2.41-4.45zM10.5 10c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5S9 12.33 9 11.5c0-.11.02-.21.03-.31.15-.68.75-1.19 1.47-1.19zM25 24.45l.97.55-.97.55v-1.1z'
    })
  );
}
export default SvgDraft2Digital;
