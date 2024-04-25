import { Badge } from 'components/badge';
import { ButtonRemove } from 'components/button-remove';
import { IconButtonRemove } from 'components/icon-button-remove';
import { IconButtonUpdate } from 'components/icon-button-update';

import { useModal } from 'features/modal/useModal';

import { RowActionsContainer } from 'pages/@common/row-actions-container';
import { useBusiness } from 'pages/@hooks/useBusiness';
import { useBusinessOwnerUpdate } from 'pages/@hooks/useBusinessOwnerUpdate';
import { useBusinessNewUpdateSection } from 'pages/@modals/useBusinessNewUpdateSection';
import { PostsLayoutSection } from 'types/business';

export interface RowActionsProps {
  rowData: PostsLayoutSection;
  routeName: string;
}
export const RowActions = ({ rowData, routeName }: RowActionsProps) => {
  const { pushModal } = useModal();
  const { business, onFetch } = useBusiness();

  const handleDelete = () => {
    pushModal(
      'Confirmation',
      {
        useProps: () => {
          const businessOwnerUpdate = useBusinessOwnerUpdate(business);

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
                isBusy={businessOwnerUpdate.status.isBusy}
                onClick={() => {
                  businessOwnerUpdate.removePostsLayoutSection(
                    { sectionId: rowData._id },
                    {
                      onAfterSuccess: () => {
                        onFetch({ routeName });
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
    businessNewUpdateSection.open({ sectionId: rowData._id });
  };

  return (
    <RowActionsContainer>
      <IconButtonRemove onClick={handleDelete} />
      <IconButtonUpdate onClick={handleUpdate} />
    </RowActionsContainer>
  );
};
