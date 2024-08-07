import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgCentos(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M15.996 3L13 6.004h2V12l1 1 1-1V6.004h2L15.996 3zM7 7v4l1.293-1.293L12.586 14H14v-1.414L9.707 8.293 11 7H7zm5.414 0l-1.293 1.293L14 11.172V7h-1.586zM18 7v4.172l2.879-2.879L19.586 7H18zm3 0l1.293 1.293L18 12.586V14h1.414l4.293-4.293L25 11V7h-4zM8.293 11.121L7 12.414V14h4.172l-2.879-2.879zm15.414 0L20.828 14H25v-1.586l-1.293-1.293zM6.004 13L3 16.004 6.004 19v-2H12l1-1-1-1H6.004v-2zm19.992 0v2H20l-1 1 1 1h5.996v2L29 15.996 25.996 13zM7 18v1.586l1.293 1.293L11.172 18H7zm5.586 0l-4.293 4.293L7 21v4h4l-1.293-1.293L14 19.414V18h-1.414zM18 18v1.414l4.293 4.293L21 25h4v-4l-1.293 1.293L19.414 18H18zm2.828 0l2.879 2.879L25 19.586V18h-4.172zM16 19l-1 1v5.996h-2L16.004 29 19 25.996h-2V20l-1-1zm-2 1.828l-2.879 2.879L12.414 25H14v-4.172zm4 0V25h1.586l1.293-1.293L18 20.828z'
    })
  );
}
export default SvgCentos;
