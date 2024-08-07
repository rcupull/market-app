import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgBuffer(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M16 5c-.156 0-.312.03-.455.09l-12.35 5.695c-.26.12-.26.308 0 .428l12.35 5.697a1.18 1.18 0 00.91 0l12.35-5.697c.26-.12.26-.308 0-.428L16.455 5.09A1.18 1.18 0 0016 5zm0 2.082L24.492 11 16 14.918 7.508 11 16 7.082zM4.84 14.447l-1.645.823c-.26.13-.26.33 0 .46l12.35 6.172a1.102 1.102 0 00.91 0l12.35-6.172c.26-.13.26-.33 0-.46l-1.645-.823-10.705 5.35a1.102 1.102 0 01-.91 0L4.84 14.447zm0 5l-1.645.823c-.26.13-.26.33 0 .46l12.35 6.172a1.102 1.102 0 00.91 0l12.35-6.172c.26-.13.26-.33 0-.46l-1.645-.823-10.705 5.35a1.102 1.102 0 01-.91 0L4.84 19.447z'
    })
  );
}
export default SvgBuffer;
