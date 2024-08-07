import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgScrewdriverSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M27.188 1.781l-.657.344s-1.12.598-2.437 1.406c-1.317.809-2.836 1.774-3.813 2.75-1.48 1.48-2.734 3.36-3.343 4.219l-.22-.219L16 9.594l-.719.687-2.469 2.5-.718.719.719.688.78.78-7 7-2.124 1.063-.157.313-2 4.031L2 28l.5.531 1 .969.5.5.656-.313 4.313-2.156 1.062-2.125 7-7 .782.782.687.718.719-.718 2.5-2.47.687-.718-.687-.719-.219-.219c.828-.578 2.613-1.738 4.219-3.343 2.09-2.09 4.156-6.25 4.156-6.25l.344-.657-.5-.53-2-2zm-.375 2.469l.937.938c-.5.902-2.117 3.742-3.469 5.093-1.703 1.703-4.843 3.906-4.843 3.906l-1 .657.843.875.282.281-1.063 1.063-.094-.063-.687-.719-2-2-.719-.687-.063-.094L16 12.437l1.125 1.126.688-1s2.378-3.317 3.906-4.844c.691-.692 2.172-1.723 3.437-2.5a35.571 35.571 0 011.657-.969zM15 16.438l.563.562L8.5 24.063l-.094.125-.094.156-.843 1.687L4.5 27.5l1.469-2.969 1.687-.843.157-.094.125-.094z'
    })
  );
}
export default SvgScrewdriverSolid;
