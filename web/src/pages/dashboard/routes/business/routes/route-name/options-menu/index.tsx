import { Badge } from 'components/badge';
import { Button } from 'components/button';
import { ButtonRemove } from 'components/button-remove';
import { Divider } from 'components/divider';
import { IconButtonOptionsBars } from 'components/icon-button-options-bars';
import { IconButtonRemove } from 'components/icon-button-remove';
import { IconButtonShowHide } from 'components/icon-button-show-hide';
import { IconButtonUpdate } from 'components/icon-button-update';
import { IconButtonView } from 'components/icon-button-view';
import { IconRemove } from 'components/icon-remove';
import { IconShowHide } from 'components/icon-show-hide';
import { IconUpdate } from 'components/icon-update';
import { IconView } from 'components/icon-view';
import { Menu } from 'components/menu';

import { useRemoveOneBusiness } from 'features/api/business/useRemoveOneBusiness';
import { useUpdateOneBusiness } from 'features/api/business/useUpdateOneBusiness';
import { useModal } from 'features/modal/useModal';

import { callAfarIds, useCallFromAfar } from 'hooks/useCallFromAfar';
import { useRouter } from 'hooks/useRouter';

import { KpiCredit, KpiToPay } from 'pages/@common/kpis-business';
import { Business } from 'types/business';

export interface OptionsMenuProps {
  business: Business;
  onRefresh: () => void;
}

export const OptionsMenu = ({ business, onRefresh }: OptionsMenuProps) => {
  const { routeName, hidden } = business;

  const { pushModal } = useModal();
  const { pushRoute } = useRouter();
  const { onCallAfar } = useCallFromAfar();

  const handleShowHide = () => {
    pushModal(
      'Confirmation',
      {
        useProps: () => {
          const { onClose } = useModal();
          const { updateOneBusiness } = useUpdateOneBusiness();

          return {
            className: 'max-w-lg',
            content: hidden
              ? 'Visualizar el negocio tambien mostrará todas las publicaciones qiue estaban visibles antes de ocultar el mismo. ¿Seguro que desea visualizar el negocio?'
              : 'Ocultar el negocio ocultará tambien todas las publicaciones del negocio. ¿Seguro que desea ocultar?',
            badge: <Badge variant="error" />,
            primaryBtn: (
              <Button
                label={hidden ? 'Mostrar' : 'Ocultar'}
                variant={hidden ? 'primary' : 'error'}
                onClick={() => {
                  updateOneBusiness.fetch(
                    {
                      routeName,
                      update: {
                        hidden: !hidden,
                      },
                    },
                    {
                      onAfterSuccess: () => {
                        onRefresh();
                        onCallAfar(callAfarIds.getAllUserBussiness); // update all the bussiness
                        onClose();
                      },
                    },
                  );
                }}
              />
            ),
          };
        },
      },
      { emergent: true },
    );
  };

  const handleDelete = () => {
    pushModal(
      'Confirmation',
      {
        useProps: () => {
          const { removeOneBusiness } = useRemoveOneBusiness();
          const { onClose } = useModal();

          return {
            content: (
              <div>
                <span>
                  Al eliminar este negocio seran borradas todas las imágenes y datos asociados al
                  mismo de manera <span className="font-bold">permanente</span>. Seguro que desea
                  eliminar este negocio?
                </span>
              </div>
            ),
            badge: <Badge variant="error" />,
            primaryBtn: (
              <ButtonRemove
                isBusy={removeOneBusiness.status.isBusy}
                onClick={() =>
                  removeOneBusiness.fetch(
                    { routeName },
                    {
                      onAfterSuccess: () => {
                        onRefresh();

                        onCallAfar(callAfarIds.getAllUserBussiness); // update all the bussiness
                        pushRoute('/dashboard/business');
                        onClose();
                      },
                    },
                  )
                }
              />
            ),
          };
        },
      },
      { emergent: true },
    );
  };

  const xsContent = (
    <Menu
      className="sm:hidden"
      buttonElement={<IconButtonOptionsBars />}
      bottomElement={
        <div className="flex flex-col items-center gap-2 p-2">
          <Divider className="!m-0" />

          <KpiCredit className="flex sm:hidden" />

          <KpiToPay className="flex sm:hidden" />
        </div>
      }
      items={[
        {
          label: `${hidden ? 'Mostrar' : 'Ocultar'} este negocio`,
          onClick: handleShowHide,
          svg: ({ className }) => <IconShowHide hidden={hidden} className={className} />,
        },
        {
          label: 'Editar el negocio',
          onClick: () => {
            pushModal('BusinessNew', {
              routeName,
              callAfarResources: [
                callAfarIds.getAllUserBussiness,
                callAfarIds.redirect_to_dashboard_business_routename,
              ],
            });
          },
          svg: IconUpdate,
        },
        {
          label: 'Ver la página de este negocio',
          onClick: () => pushRoute(`/${routeName}`),
          svg: IconView,
        },
        {
          label: 'Eliminar el negocio',
          onClick: handleDelete,
          svg: IconRemove,
        },
      ]}
    />
  );

  const smContent = (
    <div className="items-center hidden sm:flex">
      <IconButtonRemove title="Eliminar el negocio" onClick={handleDelete} />

      <IconButtonShowHide
        hidden={hidden}
        title={`${hidden ? 'Mostrar' : 'Ocultar'} este negocio`}
        onClick={handleShowHide}
      />

      <IconButtonUpdate
        title="Editar el negocio"
        onClick={() => {
          pushModal('BusinessNew', {
            routeName,
            callAfarResources: [
              callAfarIds.getAllUserBussiness,
              callAfarIds.redirect_to_dashboard_business_routename,
            ],
          });
        }}
      />

      <IconButtonView
        title="Ver la página de este negocio"
        onClick={() => {
          pushRoute(`/${routeName}`);
        }}
      />
    </div>
  );

  return (
    <>
      {xsContent}
      {smContent}
    </>
  );
};
