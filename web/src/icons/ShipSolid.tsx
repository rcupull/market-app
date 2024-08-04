import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgShipSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M15 3v2h-4v3H7v5.906l-.844.188v.031c-1.804.39-2.699 2.48-1.75 4.063L6 20.875v4.969c-.809-.227-1.375-.625-1.375-.625l-1.25 1.562S4.918 28 7.031 28c1.461 0 2.39-.484 2.969-.844.582.356 1.559.844 3.031.844 1.461 0 2.39-.484 2.969-.844.582.356 1.559.844 3.031.844 1.461 0 2.39-.484 2.969-.844.582.356 1.559.844 3.031.844 2.114 0 3.594-1.219 3.594-1.219l-1.25-1.562s-.543.433-1.375.656v-5l1.594-2.688c.949-1.582.054-3.671-1.75-4.062L25 13.937V8h-4V5h-4V3zm-2 4h6v3h4v3.5l-6.781-1.469L16 12l-.219.031L9 13.5V10h4zm3 7.063l9.406 2c.524.113.778.636.5 1.093l-1.75 2.938-.156.218v5.532c-.809-.227-1.375-.625-1.375-.625l-.625-.5-.625.5S20.371 26 19.031 26c-1.34 0-2.406-.781-2.406-.781l-.625-.5-.625.5S14.371 26 13.031 26c-1.34 0-2.406-.781-2.406-.781l-.625-.5-.625.5s-.543.433-1.375.656v-5.563l-.156-.218-1.75-2.938c-.278-.46-.024-.98.5-1.093zM11 16c-.602 0-1 .7-1 1.5s.398 1.5 1 1.5 1-.7 1-1.5-.398-1.5-1-1.5zm10 0c-.602 0-1 .7-1 1.5s.398 1.5 1 1.5 1-.7 1-1.5-.398-1.5-1-1.5z'
    })
  );
}
export default SvgShipSolid;
