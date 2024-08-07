import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgCss3(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M8.219 5l-.156.813-.5 2.875-.22 1.187H21.47l-.313 1.813H7.031l-.156.812-.5 2.875-.219 1.156h14.125l-.718 4.063L14.343 23l-4.093-2.25.219-1.219.219-1.156H5.811l-.125.813L5 23l-.156.75.687.344 7.813 3.812.406.188.406-.157 9.156-3.843.5-.188.125-.562L27 6.187 27.219 5zm1.656 2h14.938l-2.75 15.469-8.282 3.406-6.687-3.25.406-2.25h.781l-.25 1.438.625.343L13.812 25l.438.25.469-.219 6.156-2.843.469-.22.093-.53 1.032-5.72.218-1.187H8.563l.126-.844h14.156l.125-.843.687-3.813.219-1.156H9.75z'
    })
  );
}
export default SvgCss3;
