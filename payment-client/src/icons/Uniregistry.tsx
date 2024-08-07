import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgUniregistry(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M6 4.7v.1h5v-.1H6zm15 0v.1h5v-.1h-5zM6 6.5v.3h5v-.3H6zm15 0v.3h5v-.3h-5zM6 8.3v.4h5v-.4H6zm15 0v.4h5v-.4h-5zM6 10.1v.5h5v-.5H6zm15 0v.5h5v-.5h-5zM6 11.9v.6h5v-.6H6zm15 0v.6h5v-.6h-5zM6 13.7v.8h5v-.8H6zm15 0v.8h5v-.8h-5zM6 15.5v.9h5v-.9H6zm15 0v.9h5v-.9h-5zM6 17.3v1h5v-1H6zm15 0v1h5v-1h-5zM6.1 19.1c0 .4.1.8.2 1.2h5.3c-.2-.4-.4-.8-.5-1.2h-5zm14.8 0c-.1.4-.2.8-.4 1.2h5.3c.1-.4.2-.8.2-1.2h-5.1zM6.4 20.9c.1.4.3.9.5 1.3h6.4c-.5-.3-1-.8-1.3-1.3H6.4zm13.6 0c-.4.5-.8 1-1.4 1.3h6.5c.2-.4.3-.9.5-1.3H20zM7.2 22.7c.3.5.5 1 .8 1.4h15.9c.4-.4.7-.9.9-1.4H7.2zm1.1 1.8c.5.6 1.1 1.1 1.7 1.6h11.9c.6-.5 1.2-1 1.7-1.6H8.3zm2.1 1.8C12 27.4 13.9 28 16 28c2.1 0 4-.6 5.6-1.7H10.4z'
    })
  );
}
export default SvgUniregistry;
