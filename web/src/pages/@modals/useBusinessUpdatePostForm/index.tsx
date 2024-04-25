import { ButtonClose } from 'components/button-close';

import { useModal } from 'features/modal/useModal';

import { FetchOptions } from 'hooks/useFetch';
import { usePortal } from 'hooks/usePortal';

import { dynamic } from 'utils/makeLazy';

//eslint-disable-next-line
const Component = dynamic(() =>
  import('./Component').then((m) => ({
    default: m.Component,
  })),
);

export const useBusinessUpdatePostForm = () => {
  const { pushModal } = useModal();

  return {
    open: (options?: FetchOptions) => {
      pushModal(
        'Emergent',
        {
          useProps: () => {
            const portal = usePortal();
            return {
              title: 'Formulario de publicación',
              content: <Component portal={portal} options={options} />,
              secondaryBtn: <ButtonClose />,
              primaryBtn: <div ref={portal.ref} />,
            };
          },
        },
        { emergent: true },
      );
    },
  };
};
