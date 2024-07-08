import { Badge } from 'components/badge';
import { Button } from 'components/button';
import { FieldCheckbox } from 'components/field-checkbox';

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

  const { showMobile, showPC } = rowData;
  const handleClick = (
    value: boolean,
    field: Extract<keyof PostsLayoutSection, 'showMobile' | 'showPC'>
  ) => {
    pushModal(
      'Confirmation',
      {
        useProps: () => {
          const { onClose } = useModal();
          const { updateBusinessSection } = useUpdateBusinessSection();

          return {
            title: `${value ? 'Mostrar' : 'Ocultar'} sección`,
            content: (
              <>
                {value ? (
                  <div>
                    Esta sección será <span className="font-bold">visible</span> en{' '}
                    <span className="font-bold">{`vista ${
                      field === 'showMobile' ? 'móvil' : 'PC'
                    }`}</span>{' '}
                    para todos sus clientes. Desea continuar?
                  </div>
                ) : (
                  <div>
                    Esta sección será <span className="font-bold">oculta</span> en{' '}
                    <span className="font-bold">{`vista ${
                      field === 'showMobile' ? 'móvil' : 'PC'
                    }`}</span>{' '}
                    para todos sus clientes. Desea continuar?
                  </div>
                )}
              </>
            ),
            badge: <Badge variant="info" />,
            primaryBtn: (
              <Button
                label={value ? 'Mostrar' : 'Ocultar'}
                isBusy={updateBusinessSection.status.isBusy}
                onClick={() => {
                  if (!business) return;

                  updateBusinessSection.fetch(
                    {
                      routeName: business.routeName,
                      sectionId: rowData._id,
                      data: { [field]: value },
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

  return (
    <div className="flex flex-col">
      <FieldCheckbox
        noUseFormik
        label="Móviles"
        value={showMobile}
        onClick={() => handleClick(!showMobile, 'showMobile')}
      />
      <FieldCheckbox
        noUseFormik
        label="PCs"
        value={showPC}
        onClick={() => handleClick(!showPC, 'showPC')}
      />
    </div>
  );
};
