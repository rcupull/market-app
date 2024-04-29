import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgBurnSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props,
    },
    createElement('path', {
      d: 'M16.031 3.469l-.656.562s-2.34 1.91-4.656 4.688C8.402 11.496 6 15.16 6 19c0 2.766 1.133 5.07 2.969 6.625 1.722 1.457 4.027 2.246 6.531 2.344.168.008.332.031.5.031.168 0 .332-.023.5-.031 2.504-.098 4.809-.887 6.531-2.344C24.867 24.07 26 21.765 26 19c0-3.457-2.414-7.059-4.719-9.938-2.304-2.878-4.593-5-4.593-5zM15.97 6.25c.52.492 1.883 1.727 3.75 4.063C21.914 13.059 24 16.559 24 19c0 2.234-.867 3.93-2.281 5.125-.344.29-.719.555-1.125.781.246-.59.406-1.23.406-1.906 0-6.25-3.344-10.063-3.344-10.063l-1.812-2.03.062 2.718s.004 1.273-.156 2.5c-.082.613-.195 1.223-.344 1.563-.043.097-.062.109-.094.156a2.209 2.209 0 01-.718-.5c-.336-.344-.563-.688-.563-.688l-.969-1.5-.75 1.625S11 19.457 11 23c0 .676.16 1.316.406 1.906a7.205 7.205 0 01-1.125-.781C8.867 22.93 8 21.235 8 19c0-2.957 2.098-6.379 4.281-9 1.852-2.219 3.164-3.305 3.688-3.75zm1.687 10.531C18.34 18.266 19 20.34 19 23a3 3 0 01-6 0c0-1.594.309-2.941.594-3.906.449.402 1 .812 1.812.812.477 0 .93-.218 1.219-.5.29-.281.453-.613.594-.937.226-.528.343-1.114.437-1.688z',
    }),
  );
}
export default SvgBurnSolid;
