import { ButtonClose } from 'components/button-close';

import { useModal } from 'features/modal/useModal';

import { usePortal } from 'hooks/usePortal';

import { User } from 'types/auth';
import { dynamic } from 'utils/makeLazy';

//eslint-disable-next-line
const Component = dynamic(() => import('./Component').then((m) => m));

export const useUserUpdateSettings = () => {
  const { pushModal } = useModal();

  return {
    open: (args: { user: User; onAfterSuccess?: () => void }) => {
      pushModal(
        'Emergent',
        {
          useProps: () => {
            const { user, onAfterSuccess } = args;
            const { onClose } = useModal();
            const portal = usePortal();

            return {
              title: 'Preferencias de usuario',
              content: (
                <Component
                  portal={portal}
                  user={user}
                  onAfterSuccess={() => {
                    onClose();
                    onAfterSuccess?.();
                  }}
                />
              ),
              secondaryBtn: <ButtonClose />,
              primaryBtn: <div ref={portal.ref} />,
            };
          },
        },
        { emergent: true }
      );
    },
  };
};
