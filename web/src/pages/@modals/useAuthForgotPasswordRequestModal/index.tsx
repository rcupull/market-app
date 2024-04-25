import { ButtonClose } from 'components/button-close';

import { useModal } from 'features/modal/useModal';

import { usePortal } from 'hooks/usePortal';

import { dynamic } from 'utils/makeLazy';

//eslint-disable-next-line
const Component = dynamic(() =>
  import('./Component').then((m) => ({
    default: m.Component,
  })),
);

export const useAuthForgotPasswordRequestModal = () => {
  const { pushModal } = useModal();

  return {
    open: () => {
      pushModal(
        'Emergent',
        {
          useProps: () => {
            const portal = usePortal();

            return {
              content: <Component portal={portal} />,
              secondaryBtn: <ButtonClose />,
              primaryBtn: <div ref={portal.ref} />,
              className: '!w-[30rem]',
            };
          },
        },
        { emergent: true },
      );
    },
  };
};
