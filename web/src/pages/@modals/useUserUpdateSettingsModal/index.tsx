import { ButtonClose } from 'components/button-close';

import { useModal } from 'features/modal/useModal';

import { usePortal } from 'hooks/usePortal';

import { User } from 'types/auth';
import { dynamic } from 'utils/makeLazy';

//eslint-disable-next-line
const Component = dynamic(() => import('./Component').then((m) => m));

export const useUserUpdateSettingsModal = () => {
  const { pushModal } = useModal();

  return {
    userUpdateSettingsModal: {
      open: (args: { user: User; onAfterSuccess?: () => void }) => {
        pushModal('Emergent', {
          useProps: () => {
            const { user, onAfterSuccess } = args;
            const { onClose } = useModal();
            const portal = usePortal();

            return {
              title: 'Ajustes',
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
              primaryBtn: <div ref={portal.ref} />
            };
          }
        });
      }
    }
  };
};
