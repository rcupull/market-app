import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgJournalWhillsSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props,
    },
    createElement('path', {
      d: 'M9 4C7.355 4 6 5.355 6 7v18c0 1.645 1.355 3 3 3h17V4H9zm0 2h15v16H9a2.93 2.93 0 00-1 .188V7c0-.566.434-1 1-1zm7 2.215c-.114 0-.21.09-.215.205l-.248 5.937-.642-.437a.215.215 0 00-.305.287l.459.768-.961.199a.215.215 0 000 .42l.96.199-.458.766a.215.215 0 00.183.324.224.224 0 00.122-.037l.556-.377-.072 1.752A3.003 3.003 0 0113 15.285c0-.806.323-1.533.84-2.072a3.41 3.41 0 01-1.27-2.643c0-.657.195-1.263.516-1.785a5.996 5.996 0 00-2.484 2.639l1.416 1.416a.428.428 0 11-.608.605l-1.139-1.138c-.16.54-.272 1.101-.271 1.693 0 .028.009.052.01.08l1.986 1.74a.43.43 0 01.041.606.425.425 0 01-.322.144.427.427 0 01-.283-.105l-1.264-1.106C10.786 18.016 13.156 20 16 20s5.214-1.985 5.832-4.64l-1.264 1.107a.428.428 0 01-.605-.041v-.002a.428.428 0 01.04-.604l1.99-1.74c0-.028.007-.052.007-.08 0-.592-.113-1.152-.271-1.693l-1.14 1.138a.429.429 0 01-.605-.605l1.414-1.416a5.991 5.991 0 00-2.484-2.639 3.4 3.4 0 01.516 1.785c0 1.07-.502 2.014-1.27 2.643.517.539.84 1.266.84 2.072a3.002 3.002 0 01-2.377 2.934l-.076-1.836.68.46a.215.215 0 00.267-.02.212.212 0 00.037-.264l-.459-.768.961-.2c.1-.02.17-.107.17-.208 0-.101-.07-.19-.17-.211l-.96-.2.458-.767a.212.212 0 00-.037-.264.218.218 0 00-.267-.021l-.762.516-.25-6.016A.215.215 0 0016 8.215zM9 24h15v2H9c-.566 0-1-.434-1-1 0-.566.434-1 1-1z',
    }),
  );
}
export default SvgJournalWhillsSolid;
