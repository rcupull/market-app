import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgDragonSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props,
    },
    createElement('path', {
      d: 'M8 3v6l-5 1.5L6.5 14 4 19h5v10h2v-9.152c1.297.562 2.66 1.14 5.004 2.074 0 .027-.004.05-.004.078 0 2.23.7 4.047 1.98 5.25C19.258 28.457 21.04 29 23 29v-2c-1.602 0-2.82-.426-3.652-1.203-.711-.672-1.192-1.645-1.317-3.063 1.317.496 2.5.914 3.32 1.137.286.074.579.113.868.113 1.82 0 3.582-1.453 3.914-3.297L27 16l-3 2c-4.688 0-5.8-3-5.8-3 .35-.844 1.077-1.441 1.921-1.879L21 14v-1.262c.188-.066.375-.12.563-.175L23 14v-1.781c.059-.012.125-.028.184-.035L25 14v-2l3 2V9.152c0-1.476-1-2.836-2.45-3.101A2.98 2.98 0 0025 6c-.8 0-1.516.336-2.055.852L21.5 3 20 7h-6zm2 3.734l2.89 1.93.505.336h10.277l.594-.656a.995.995 0 01.922-.328c.457.086.812.582.812 1.136V10h-.395l-.015-.008L25 10h-.031c-.707.012-6.938.23-8.614 4.227l-.304.726.273.738C16.918 17.293 19.2 20 24 20h.227l-.063.34c-.156.875-1.066 1.644-1.945 1.644-.121 0-.239-.015-.348-.047-3.082-.828-11.976-4.73-12.066-4.769L9.422 17H7.234l1.055-2.105.645-1.29-2.153-2.152 1.797-.535 1.422-.43zM13 10s.23 2 2 2 3-2 3-2z',
    }),
  );
}
export default SvgDragonSolid;
