import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgSlidersHSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M15 5c-1.293 0-2.395.844-2.813 2H4v2h8.188c.417 1.156 1.519 2 2.812 2s2.395-.844 2.813-2H28V7H17.812C17.395 5.844 16.294 5 15 5zm0 2c.563 0 1 .438 1 1 0 .563-.438 1-1 1-.563 0-1-.438-1-1 0-.563.438-1 1-1zm7 6c-1.293 0-2.395.844-2.813 2H4v2h15.188c.417 1.156 1.519 2 2.812 2s2.395-.844 2.813-2H28v-2h-3.188c-.417-1.156-1.519-2-2.812-2zm0 2c.563 0 1 .438 1 1 0 .563-.438 1-1 1-.563 0-1-.438-1-1 0-.563.438-1 1-1zm-11 6c-1.293 0-2.395.844-2.813 2H4v2h4.188c.417 1.156 1.519 2 2.812 2s2.395-.844 2.813-2H28v-2H13.812c-.417-1.156-1.519-2-2.812-2zm0 2c.563 0 1 .438 1 1 0 .563-.438 1-1 1-.563 0-1-.438-1-1 0-.563.438-1 1-1z'
    })
  );
}
export default SvgSlidersHSolid;
