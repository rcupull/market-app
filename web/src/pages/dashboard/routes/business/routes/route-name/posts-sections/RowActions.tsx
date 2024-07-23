import { useRef } from 'react';

import { Badge } from 'components/badge';
import { ButtonRemove } from 'components/button-remove';
import { IconButtonMoveDown } from 'components/icon-button-move-down';
import { IconButtonMoveUp } from 'components/icon-button-move-up';
import { IconButtonRemove } from 'components/icon-button-remove';
import { IconButtonUpdate } from 'components/icon-button-update';

import { useBusinessSectionsReorder } from 'features/api/business/useBusinessSectionsReorder';
import { useRemoveBusinessSection } from 'features/api/business/useRemoveBusinessSection';
import { useModal } from 'features/modal/useModal';

import { RowActionsContainer } from 'pages/@common/row-actions-container';
import { useBusiness } from 'pages/@hooks/useBusiness';
import { useBusinessNewUpdateSectionModal } from 'pages/@modals/useBusinessNewUpdateSectionModal';
import { PostsLayoutSection } from 'types/business';

export interface RowActionsProps {
  rowData: PostsLayoutSection;
  rowIndex: number;
  allSections: Array<PostsLayoutSection>;
}
export const RowActions = ({ rowData, allSections, rowIndex }: RowActionsProps) => {
  const { pushModal } = useModal();
  const { business, onFetch } = useBusiness();
  const { businessSectionsReorder } = useBusinessSectionsReorder();

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

  const { businessNewUpdateSectionModal } = useBusinessNewUpdateSectionModal();
  const handleUpdate = () => {
    businessNewUpdateSectionModal.open({
      sectionId: rowData._id,
      onAfterSuccess: () => business && onFetch({ routeName: business.routeName }),
    });
  };

  const refDirectionReorder = useRef<'up' | 'down' | null>();
  const handleReorder = (direction: 'up' | 'down') => {
    if (!business) return;

    refDirectionReorder.current = direction;

    businessSectionsReorder.fetch(
      {
        routeName: business?.routeName,
        fromIndex: rowIndex,
        toIndex: direction === 'up' ? rowIndex - 1 : rowIndex + 1,
      },
      {
        onAfterSuccess: () => {
          onFetch({ routeName: business?.routeName });
        },
      }
    );
  };

  return (
    <RowActionsContainer>
      <IconButtonRemove onClick={handleDelete} />
      <IconButtonUpdate onClick={handleUpdate} />
      {rowIndex > 0 && (
        <IconButtonMoveUp
          isBusy={businessSectionsReorder.status.isBusy && refDirectionReorder.current === 'up'}
          onClick={() => handleReorder('up')}
        />
      )}
      {rowIndex < allSections.length - 1 && (
        <IconButtonMoveDown
          isBusy={businessSectionsReorder.status.isBusy && refDirectionReorder.current === 'down'}
          onClick={() => handleReorder('down')}
        />
      )}
    </RowActionsContainer>
  );
};
