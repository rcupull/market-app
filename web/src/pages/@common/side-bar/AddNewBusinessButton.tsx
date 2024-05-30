import { IconButtonAdd } from 'components/icon-button-add';

import { useAllUserBusiness } from 'features/api-slices/useGetAllUserBusinessPersistent';

import { useRouter } from 'hooks/useRouter';

import { useBusinessUpdateNewModal } from 'pages/@modals/useBusinessUpdateNewModal';
import { StyleProps } from 'types/general';
import { getDashboardBusinessRoute } from 'utils/business';

export interface AddNewBusinessButtonProps extends StyleProps {}

export const AddNewBusinessButton = ({ className }: AddNewBusinessButtonProps) => {
  const { pushRoute } = useRouter();
  const businessUpdateNewModal = useBusinessUpdateNewModal();
  const allUserBusiness = useAllUserBusiness();

  return (
    <IconButtonAdd
      title="Agragar nuevo negocio"
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();

        businessUpdateNewModal.open({
          onAfterSucess: (newBussiness) => {
            if (newBussiness) {
              const { routeName } = newBussiness;
              pushRoute(getDashboardBusinessRoute({ routeName }), {}, { timeout: 100 });
              allUserBusiness.init();
            }
          },
        });
      }}
      className={className}
    />
  );
};
