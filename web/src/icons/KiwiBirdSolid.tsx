import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgKiwiBirdSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props,
    },
    createElement('path', {
      d: 'M11.48 4C6.414 4.113 2.113 8.414 2 13.48a9.186 9.186 0 004 7.817v6.238l3.445 2.297 1.11-1.664L8 26.465v-4.117a9.477 9.477 0 002 .527v2.844l3.684 1.23.632-1.898L12 24.28v-1.3c4.383-.102 5.176-1.415 6.473-1.954 2.515-1.015 3.437-2.34 3.894-3.238.227-.45.356-.71.528-.887.171-.175.437-.359 1.136-.527l.004-.004c.64-.152 1.192-.34 1.68-.55.098.292.207.636.316 1.062C26.508 18.66 27 21.574 27 26h2c0-4.574-.508-7.66-1.031-9.633a14.555 14.555 0 00-.543-1.648c.207-.2.387-.41.531-.625.648-.977.64-1.996.64-2.496 0-1.164-.285-2.364-1.085-3.301C26.707 7.363 25.414 6.8 23.8 6.8a4.9 4.9 0 00-4.254 2.472C18.187 6.055 15.375 4 11.5 4zm.036 2c3.636.008 5.714 1.707 6.62 4.969l.204.73h2.453l.18-.77c.289-1.222 1.472-2.128 2.828-2.128 1.187 0 1.793.336 2.187.8.399.465.61 1.165.61 1.997 0 .5-.004.933-.305 1.386-.3.45-.977 1.032-2.723 1.442h-.008c-.94.23-1.628.597-2.097 1.078-.473.484-.684.992-.883 1.383-.395.777-.672 1.402-2.86 2.285l-.003.004C15.672 20.02 16.03 21 11.5 21c-4.285 0-7.59-3.215-7.5-7.48.086-3.93 3.582-7.426 7.516-7.52z',
    }),
  );
}
export default SvgKiwiBirdSolid;
