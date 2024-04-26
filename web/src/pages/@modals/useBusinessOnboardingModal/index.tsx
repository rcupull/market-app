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

export const useBusinessOnboardingModal = () => {
  const { pushModal } = useModal();

  return {
    open: (args: {routeName: string}) => {
      pushModal(
        'Emergent',
        {
          useProps: () => {
            const { routeName } = args
            const portal = usePortal();

            return {
              content: <Component portal={portal} routeName={routeName}/>,
              secondaryBtn: <ButtonClose />,
              primaryBtn: <div ref={portal.ref} />,
              className: '!w-[80vw]',
            };
          },
        },
        { emergent: true },
      );
    },
  };
};
