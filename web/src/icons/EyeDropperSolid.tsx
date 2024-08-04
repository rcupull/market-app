import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgEyeDropperSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M24.656 3.031c-1.11 0-2.222.41-3.062 1.25l-2.782 2.813-1-1L16.407 7.5l1 1-9.5 9.5c-1.039 1.04-1.633 1.793-2 2.469a5.224 5.224 0 00-.562 1.687c-.067.403-.102.621-.344 1.063-.242.441-.734 1.078-1.719 2.062L2.594 26l.687.719 2 2 .719.687.719-.687c.96-.961 1.574-1.426 2-1.657.426-.23.652-.273 1.062-.343.41-.07 1-.184 1.688-.563.687-.379 1.469-1 2.531-2.062l9.5-9.5 1 1 1.406-1.406-1-1 2.813-2.782c1.68-1.68 1.68-4.445 0-6.125a4.311 4.311 0 00-3.063-1.25zm0 2c.59 0 1.164.227 1.625.688a2.299 2.299 0 010 3.281L23.5 11.781 20.219 8.5 23 5.719a2.344 2.344 0 011.656-.688zm-5.843 4.875l3.28 3.281-9.5 9.5c-.984.985-1.652 1.477-2.093 1.72-.441.241-.66.277-1.063.343-.402.066-.98.164-1.656.531-.46.25-1.086.848-1.687 1.375l-.75-.75c.547-.617 1.148-1.25 1.406-1.718.379-.688.492-1.31.563-1.72.07-.41.113-.605.343-1.03.23-.426.696-1.07 1.657-2.032z'
    })
  );
}
export default SvgEyeDropperSolid;
