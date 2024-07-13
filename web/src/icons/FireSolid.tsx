import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgFireSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props,
    },
    createElement('path', {
      d: 'M14.375 3l-.188.781c-.3 1.348-2.234 3.567-4.218 6.281C7.984 12.777 6 16.16 6 20.407c0 2.004.613 4.145 2.125 5.813C9.637 27.887 12.047 29 15.313 29c.144 0 .265-.027.406-.031.094.004.183.031.281.031.305 0 .59-.035.875-.063.086-.007.164-.023.25-.03 3.348-.278 5.57-1.31 6.938-2.845C25.668 24.262 26 21.977 26 20c0-4.465-2.57-8.617-5.063-11.688-2.492-3.07-5-5.093-5-5.093L15.658 3zM15.5 5.5c.809.71 2.172 1.996 3.875 4.094C21.727 12.492 24 16.332 24 20c0 1.754-.309 3.453-1.438 4.719-.242.273-.535.539-.875.781.54-1.559.422-3.332.063-5.094-.41-2.011-1.188-4.031-1.938-5.656s-1.39-2.773-1.937-3.406L17.594 11h-1.938l.375 1.281c1.047 3.403.496 5.719-.093 6.406-.293.344-.422.375-.72.282-.296-.094-.831-.48-1.343-1.438l-.75-1.406-.938 1.281c-1.87 2.52-2.59 5.282-1.968 7.594.054.203.14.402.219.594a6.031 6.031 0 01-.813-.719C8.508 23.645 8 22 8 20.406c0-3.62 1.703-6.57 3.594-9.156 1.539-2.105 3.039-3.883 3.906-5.75zm3.063 11.719c.464 1.176.968 2.363 1.218 3.593.364 1.79.356 3.426-.156 4.47-.383.78-.977 1.355-2.188 1.593-.132.027-.289.043-.437.063-.313.027-.656.05-1 .062-.09 0-.164.004-.25 0-2.164-.07-3.203-1.035-3.594-2.5-.324-1.207.098-2.89 1-4.594.446.461.918.797 1.469.969 1.02.32 2.156-.07 2.844-.875.59-.691.937-1.648 1.093-2.781z',
    })
  );
}
export default SvgFireSolid;
