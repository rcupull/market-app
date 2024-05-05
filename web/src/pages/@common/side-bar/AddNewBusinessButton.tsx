import { IconButtonAdd } from 'components/icon-button-add';

import { useModal } from 'features/modal/useModal';

import { callAfarIds, useCallFromAfar } from 'hooks/useCallFromAfar';
import { useRouter } from 'hooks/useRouter';

import { Business } from 'types/business';
import { StyleProps } from 'types/general';

export interface AddNewBusinessButtonProps extends StyleProps {}

export const AddNewBusinessButton = ({ className }: AddNewBusinessButtonProps) => {
  const { pushModal } = useModal();
  const { pushRoute } = useRouter();

  useCallFromAfar(
    callAfarIds.side_bar_redirect_to_last_created_business,
    (newBussiness: Business) => {
      const { routeName } = newBussiness;
      pushRoute(`/dashboard/business/${routeName}`, {}, { timeout: 100 });
    },
  );

  return (
    <IconButtonAdd
      title="Agragar nuevo negocio"
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();

        pushModal('BusinessNew', {
          callAfarResources: [
            callAfarIds.side_bar_redirect_to_last_created_business,
            callAfarIds.getAllUserBussiness,
          ],
        });
      }}
      className={className}
    />
  );
};
