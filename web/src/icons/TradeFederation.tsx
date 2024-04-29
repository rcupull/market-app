import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgTradeFederation(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props,
    },
    createElement('path', {
      d: 'M16 3C8.819 3 3 8.819 3 16s5.819 13 13 13 13-5.819 13-13S23.181 3 16 3zm0 .691c6.799 0 12.309 5.51 12.309 12.309 0 6.799-5.51 12.309-12.309 12.309-6.799 0-12.309-5.51-12.309-12.309C3.691 9.201 9.201 3.691 16 3.691zm0 .414C9.432 4.105 4.105 9.432 4.105 16S9.432 27.895 16 27.895 27.895 22.568 27.895 16 22.568 4.105 16 4.105zm0 .698c3.161 0 6.019 1.31 8.053 3.418H13.615v4.277H5.363C6.831 8.032 11.041 4.803 16 4.803zM9.684 7.859l.09.729-.75.2.716.142-.04.77.355-.641.722.279-.496-.535.489-.604-.666.31-.42-.65zm4.183.676h10.37v2.658H16.6v1.62h4.359v2.673h-4.367v10.258H13.83V15.43H7.713l-2.098-2.617h8.252V8.535zm.104.1v4.283H5.84l1.925 2.41h6.17v10.317h2.556V15.38h4.367v-2.463h-4.367v-1.824h7.639V8.635H13.97zm-2.787.115l.109 1.248-1.232.283 1.22.283-.11 1.258.645-1.076 1.164.498-.822-.947.828-.95-1.154.489-.648-1.086zm13.418.096A11.143 11.143 0 0127.186 16C27.192 22.18 22.18 27.191 16 27.191S4.803 22.18 4.803 16c0-1.111.162-2.191.467-3.203l2.296 2.951h6.012v10.316h3.387V15.801h4.365v-3.287h-4.36v-1.006h7.632V8.846zm-10.067.38h9.008v1.28h-7.602v2.945h4.346v1.254h-4.346v10.348h-1.404V14.705h-6.49l-1.055-1.254h7.543V9.227zm8.295 2.59l.115 1.192-1.17.281 1.164.258-.093 1.2.603-1.026 1.112.46-.793-.892.787-.922-1.096.477-.629-1.028zm-11.033 4.016l.088 1.283-1.242.205 1.248.309-.194 1.248.682-1.096 1.127.567-.828-.987.884-.894-1.189.486-.576-1.121zm6.084.236l.068.744-.728.168.728.168-.062.745.383-.641.685.287-.492-.56.488-.565-.687.293-.383-.639z',
    }),
  );
}
export default SvgTradeFederation;
