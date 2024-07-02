import { Badge } from 'components/badge';
import { Button } from 'components/button';
import { IconButtonShowHide } from 'components/icon-button-show-hide';

import { useUpdateBusinessSection } from 'features/api/business/useUpdateBusinessSection';
import { useModal } from 'features/modal/useModal';

import { useBusiness } from 'pages/@hooks/useBusiness';
import { PostsLayoutSection } from 'types/business';

export interface IconButtonShowHideSectionProps {
  rowData: PostsLayoutSection;
}

export const IconButtonShowHideSection = ({ rowData }: IconButtonShowHideSectionProps) => {
  const { pushModal } = useModal();
  const { business, onFetch } = useBusiness();

  const { hidden } = rowData;
  const handleClick = () => {
    pushModal(
      'Confirmation',
      {
        useProps: () => {
          const { onClose } = useModal();
          const { updateBusinessSection } = useUpdateBusinessSection();

          return {
            title: `${hidden ? 'Mostrar' : 'Ocultar'} sección`,
            content: (
              <>
                {hidden ? (
                  <div>
                    Esta sección será <span className="font-bold">visible</span> para todos sus
                    clientes. Desea continuar?
                  </div>
                ) : (
                  <div>
                    Esta sección será <span className="font-bold">oculta</span> para todos sus
                    clientes. Desea continuar?
                  </div>
                )}
              </>
            ),
            badge: <Badge variant="info" />,
            primaryBtn: (
              <Button
                label={hidden ? 'Mostrar' : 'Ocultar'}
                isBusy={updateBusinessSection.status.isBusy}
                onClick={() => {
                  if (!business) return;

                  updateBusinessSection.fetch(
                    {
                      routeName: business.routeName,
                      sectionId: rowData._id,
                      data: { hidden: !hidden },
                    },
                    {
                      onAfterSuccess: () => {
                        onFetch({ routeName: business.routeName });
                        onClose();
                      },
                    }
                  );
                }}
              />
            ),
          };
        },
      },
      { emergent: true }
    );
  };

  return <IconButtonShowHide hidden={hidden} onClick={handleClick} />;
};
