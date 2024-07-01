import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgFedex(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props,
    },
    createElement('path', {
      d: 'M16 11v3.95h-.08c-.48-.576-1.075-.774-1.77-.774-1.42 0-2.49 1.014-2.865 2.347-.9-3.107-4.87-3.013-6.096-.732v-1.266H2.45v-1.37h3v-2.15H0v9.643h2.45v-4.052h2.445a3.907 3.907 0 00-.116.953c0 3.823 5.13 4.778 6.51 1.238h-2.1c-.735 1.093-2.289.465-2.289-.764h4.276C11.36 19.618 12.545 21 14.18 21a2.07 2.07 0 001.746-.973h.023v.621h10.612l1.103-1.306 1.115 1.306H32l-2.7-3.164 2.665-3.132h-3.12L27.76 15.65l-1.125-1.296h-5.936v-.838h2.807V11H16zm2.305.467h4.75v1.578H20.25v1.773h2.775v1.47h-2.804v2.339h2.804v1.547h-4.72v-8.707zm5.23 3.049l2.535 2.98-2.535 2.98v-2.384H20.73v-1.276h2.805v-2.3zm.914.302h1.987l1.33 1.532 1.279-1.532h1.926l-2.272 2.666L31 20.174h-2.025L27.66 18.63l-1.305 1.543H24.45l2.281-2.678-2.28-2.678zM8.152 15.6c.513.004 1.017.348 1.137 1.017H6.965c.152-.688.674-1.022 1.187-1.017zm6.483.29c1.63 0 1.725 3.286 0 3.286-1.73 0-1.7-3.285 0-3.285z',
    })
  );
}
export default SvgFedex;
