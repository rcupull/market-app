import { IconButtonShowHide } from 'components/icon-button-show-hide';
import { IconButtonView } from 'components/icon-button-view';

import { useAllUserBusiness } from 'features/api-slices/useGetAllUserBusinessPersistent';

import { useRouter } from 'hooks/useRouter';

import { useBusinessShowHide } from 'pages/@hooks/useBusinessShowHide';
import { Business } from 'types/business';
import { getOneBusinessRoute } from 'utils/business';

export interface OptionsProps {
  business: Business;
  onRefresh: () => void;
}

export const Options = ({ business, onRefresh }: OptionsProps) => {
  const { routeName, hidden } = business;
  const { allUserBusiness } = useAllUserBusiness();

  const { pushRoute } = useRouter();

  const { onBusinessShowHide } = useBusinessShowHide();

  return (
    <div className="w-full flex items-center justify-between">
      <div className="flex items-center">
        <IconButtonShowHide
          hidden={hidden}
          title={`${hidden ? 'Mostrar' : 'Ocultar'} este negocio`}
          onClick={() => {
            onBusinessShowHide(business, {
              onAfterSuccess: () => {
                onRefresh();
                allUserBusiness.refresh();
              },
            });
          }}
        />

        <IconButtonView
          title="Ver la página de este negocio"
          onClick={() => {
            pushRoute(getOneBusinessRoute({ routeName }));
          }}
        />
      </div>
    </div>
  );
};
