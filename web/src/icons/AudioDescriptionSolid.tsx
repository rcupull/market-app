import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgAudioDescriptionSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props,
    },
    createElement('path', {
      d: 'M5.594 7l-.313.281S2 10.601 2 16c0 5.398 3.281 8.719 3.281 8.719l.313.281h20.812l.313-.281S30 21.399 30 16c0-5.398-3.281-8.719-3.281-8.719L26.406 7zm.937 2H25.47c.336.355 2.531 2.73 2.531 7s-2.195 6.645-2.531 7H6.53C6.195 22.645 4 20.27 4 16s2.195-6.645 2.531-7zm3.844 3l-4 8h2.25l.5-1H11v1h2c2.2 0 4-1.8 4-4s-1.8-4-4-4zm5.594 0A4.976 4.976 0 0118 16c0 1.64-.805 3.09-2.031 4h2.781A6.953 6.953 0 0020 16a6.953 6.953 0 00-1.25-4zm3.937 0A7.96 7.96 0 0121 16a7.96 7.96 0 01-1.094 4h2.25A9.982 9.982 0 0023 16a9.916 9.916 0 00-.844-4zm3.344 0a10.9 10.9 0 01.75 4 10.9 10.9 0 01-.75 4h2.125A12.91 12.91 0 0026 16a12.91 12.91 0 00-.625-4zM13 14c1.117 0 2 .883 2 2s-.883 2-2 2zm-2 1.25V17h-.875z',
    })
  );
}
export default SvgAudioDescriptionSolid;
