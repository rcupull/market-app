import { ButtonClose } from 'components/button-close';

import { useModal } from 'features/modal/useModal';

import { usePortal } from 'hooks/usePortal';

import { dynamic } from 'utils/makeLazy';

//eslint-disable-next-line
const Component = dynamic(() => import('./Component').then((m) => m));

export const useAuthSignInModal = () => {
  const { pushModal } = useModal();

  return {
    authSignInModal: {
      open: (args?: { email?: string; redirect?: string | false }) => {
        pushModal('Emergent', {
          useProps: () => {
            const { email, redirect } = args || {};
            const portal = usePortal();

            return {
              content: <Component portal={portal} email={email} redirect={redirect} />,
              secondaryBtn: <ButtonClose />,
              primaryBtn: <div ref={portal.ref} />,
              className: '!w-[30rem]'
            };
          }
        });
      }
    }
  };
};
