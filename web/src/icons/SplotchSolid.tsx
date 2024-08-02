import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgSplotchSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props,
    },
    createElement('path', {
      d: 'M17.379 4.918a3.837 3.837 0 00-2.781 1.234l-1.942 2.3c-.363.393-.93.596-1.594.548H7.97c-1.666 0-3.088.82-3.715 2.139-.513 1.08-.363 2.286.459 3.285l1.998 2.053c.27.333.354.61.107 1.134l-1.441 2.522c-.547 1.149-.394 2.431.41 3.435.895 1.116 2.414 1.625 3.91 1.282l2.885-.78a1.952 1.952 0 011.645.366l2.51 1.806a3.856 3.856 0 002.39.824 3.97 3.97 0 001.613-.343c1.224-.54 2.01-1.611 2.102-2.87l.201-2.787c.032-.456.328-.875.838-1.15l2.27-1.383c1.232-.66 1.936-1.89 1.84-3.209-.1-1.346-1.004-2.484-2.36-2.97l-2.879-1.034c-.514-.184-.892-.568-1.008-1.027l-.687-2.723c-.315-1.245-1.296-2.188-2.625-2.527a4.047 4.047 0 00-1.053-.125zm.115 2.002c.157.005.306.026.442.06.607.154 1.047.56 1.18 1.082l.687 2.721c.28 1.105 1.126 2.01 2.27 2.42l2.88 1.033c.611.218 1 .682 1.041 1.237.04.535-.248 1.007-.838 1.324l-2.267 1.385c-1.07.574-1.76 1.598-1.842 2.742l-.201 2.785c-.053.73-.656 1.073-.912 1.186a1.938 1.938 0 01-1.995-.249l-2.51-1.806a3.885 3.885 0 00-2.404-.815c-.307 0-.617.036-.925.108l-2.883.78c-.87.194-1.547-.196-1.865-.593-.187-.233-.46-.715-.204-1.26l1.444-2.519c.582-1.22.471-2.338-.385-3.389l-2-2.056a.978.978 0 01-.144-1.1C6.28 11.537 6.91 11 7.968 11l3.01-.002a3.888 3.888 0 003.175-1.223l1.94-2.298c.4-.433.93-.572 1.4-.557z',
    })
  );
}
export default SvgSplotchSolid;
