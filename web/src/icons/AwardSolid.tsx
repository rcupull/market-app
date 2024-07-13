import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgAwardSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props,
    },
    createElement('path', {
      d: 'M16 3c-.625 0-1.246.21-1.781.594L12.563 4.75 10.655 5h-.031l-.031.031A3.394 3.394 0 008.03 7.594L8 7.625v.031l-.25 1.938-1.156 1.5-.032.031v.031c-.699 1.117-.73 2.559.032 3.625l1.187 1.656.313 1.72-3.219 4.905-1.031 1.532h4.781l1.156 2.687L10.5 29l1.031-1.563 3.156-4.75c.848.348 1.805.38 2.626 0l3.156 4.75L21.5 29l.719-1.719 1.156-2.687h4.781l-1.031-1.532L24 18.313l.25-1.875 1.156-1.656.032-.031v-.031c.699-1.117.73-2.528-.032-3.594L24.25 9.469l-.375-1.875h.031c-.004-.024-.027-.04-.031-.063-.18-1.308-1.215-2.37-2.531-2.531h-.032l-1.875-.25-1.656-1.156A3.074 3.074 0 0016 3zm0 2.031c.23 0 .457.07.625.188L18.406 6.5l.219.156.25.032L21.063 7h.03c.45.05.762.363.813.813v.062l.407 2.219.03.219.157.187 1.281 1.781c.239.332.27.895-.031 1.375l-1.406 1.969-.032.25L22 18.063v.03a.994.994 0 01-.156.438l-.063.032v.03a.88.88 0 01-.593.313h-.063l-2.281.407-.25.03-.188.157-1.781 1.281c-.332.239-.926.27-1.406-.031l-1.625-1.25-.188-.156-.281-.032L10.937 19h-.03a.885.885 0 01-.688-.438.99.99 0 01-.125-.375v-.062l-.406-2.281-.032-.25-.156-.188-1.281-1.781c-.239-.332-.27-.926.031-1.406l1.25-1.625.156-.188.031-.281.282-2.094c.004-.015.027-.015.031-.031a1.394 1.394 0 011-1c.016-.004.016-.027.031-.031l2.094-.282.25-.03.219-.157 1.781-1.281c.168-.117.395-.188.625-.188zm6.906 15.219l1.532 2.344H22.03l-.25.625-.687 1.593-2.125-3.25.468-.343 1.97-.344v.031c.023-.004.038-.027.062-.031a2.97 2.97 0 001.437-.625zm-13.812.031a2.85 2.85 0 001.562.719h.031l1.907.25.437.344-2.125 3.218-.687-1.593-.25-.625H7.563z',
    })
  );
}
export default SvgAwardSolid;
