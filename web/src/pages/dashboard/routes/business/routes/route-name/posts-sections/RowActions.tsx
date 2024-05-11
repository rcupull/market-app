import { Badge } from 'components/badge';
import { ButtonRemove } from 'components/button-remove';
import { IconButtonRemove } from 'components/icon-button-remove';
import { IconButtonUpdate } from 'components/icon-button-update';

import { useRemoveBusinessSection } from 'features/api/business/useRemoveBusinessSection';
import { useModal } from 'features/modal/useModal';

import { RowActionsContainer } from 'pages/@common/row-actions-container';
import { useBusiness } from 'pages/@hooks/useBusiness';
import { useBusinessNewUpdateSection } from 'pages/@modals/useBusinessNewUpdateSection';
import { PostsLayoutSection } from 'types/business';

export interface RowActionsProps {
  rowData: PostsLayoutSection;
}
export const RowActions = ({ rowData }: RowActionsProps) => {
  const { pushModal } = useModal();
  const { business, onFetch } = useBusiness();

  const handleDelete = () => {
    pushModal(
      'Confirmation',
      {
        useProps: () => {
          const { removeBusinessSection } = useRemoveBusinessSection();
          const { onClose } = useModal();
          return {
            content: (
              <div>
                <span>
                  Al eliminar este grupo solo serán borrados los datos asociados al mismo de forma{' '}
                  <span className="font-bold">permanente</span>. Las publicaciones{' '}
                  <span className="font-bold">no</span> serán eliminadas. Seguro que desea eliminar
                  este grupo?
                </span>
              </div>
            ),
            badge: <Badge variant="error" />,
            primaryBtn: (
              <ButtonRemove
                isBusy={removeBusinessSection.status.isBusy}
                onClick={() => {
                  if (!business) return;

                  removeBusinessSection.fetch(
                    { sectionId: rowData._id, routeName: business.routeName },
                    {
                      onAfterSuccess: () => {
                        business && onFetch({ routeName: business.routeName });
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

  const businessNewUpdateSection = useBusinessNewUpdateSection();
  const handleUpdate = () => {
    businessNewUpdateSection.open({
      sectionId: rowData._id,
      onAfterSuccess: () => business && onFetch({ routeName: business.routeName }),
    });
  };

  return (
    <RowActionsContainer>
      <IconButtonRemove onClick={handleDelete} />
      <IconButtonUpdate onClick={handleUpdate} />
    </RowActionsContainer>
  );
};
