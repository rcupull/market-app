import { useState } from 'react';

import { ButtonSave } from 'components/button-save';
import { Divider } from 'components/divider';
import { FieldCheckbox } from 'components/field-checkbox';
import { FieldInput } from 'components/field-input';
import { FieldShowHide } from 'components/field-show-hide';
import { Formux } from 'components/formux';

import { useAddBusinessSection } from 'features/api/business/useAddBusinessSection';
import { useUpdateBusinessSection } from 'features/api/business/useUpdateBusinessSection';

import { Portal } from 'hooks/usePortal';

import { useBusiness } from 'pages/@hooks/useBusiness';
import { PostsLayoutSection, PostsLayoutSectionPayload } from 'types/business';
import { StyleProps } from 'types/general';
import { getRequiredLabel } from 'utils/form';
import { getRandomHash } from 'utils/general';

type State = PostsLayoutSectionPayload;

export interface ComponentLinkProps extends StyleProps {
  portal: Portal;
  section?: PostsLayoutSection;
  onAfterSuccess: () => void;
}

export const ComponentLink = ({
  portal,
  section,
  onAfterSuccess,
  className,
}: ComponentLinkProps) => {
  const { business } = useBusiness();
  const { updateBusinessSection } = useUpdateBusinessSection();
  const { addBusinessSection } = useAddBusinessSection();

  const [state, setState] = useState<State>({
    name: '',
    postCardLayout: {
      images: 'rounded',
      metaLayout: 'verticalCentered',
      price: 'none',
      shoppingMethod: 'none',
      size: 'medium',
    },
    postCategoriesTags: [getRandomHash()],
    searchLayout: undefined,
    type: 'oneRowSlider',
    showMobile: false,
    showPC: false,
    postType: 'link',
    ...(section || {}),
  });

  return (
    <Formux<State>
      value={state}
      onChange={setState}
      validate={[
        {
          field: 'name',
          type: 'required',
        },
      ]}
    >
      {({ value, isValid }) => {
        return (
          <form className={className}>
            <div className="flex gap-4">
              <FieldCheckbox label="Mostrar en móviles" name="showMobile" />
              <FieldCheckbox label="Mostrar en PC" name="showPC" />
            </div>

            {/* //////////////////////////////////////////////////////////////////////////////////////////////// */}
            <Divider />

            <FieldInput
              name="name"
              placeholder='Ejemplo: "Nuestros negocios asociados"'
              label={
                <div className="flex items-center">
                  <span>{getRequiredLabel('Nombre')}</span>
                  <FieldShowHide
                    name="hiddenName"
                    title={`${value.hiddenName ? 'Mostrar' : 'Ocultar'} el nombre del grupo.`}
                  />
                </div>
              }
              description={
                <div>
                  El nombre de un grupo se visualiza justo antes de las publicaciones. El mismo
                  puede ser oculto para que no aparezca en la página y solo sean visibles las
                  publicaciones.
                </div>
              }
              className="w-full"
            />

            {portal.getPortal(
              <ButtonSave
                isBusy={addBusinessSection.status.isBusy || updateBusinessSection.status.isBusy}
                disabled={!isValid}
                onClick={() => {
                  if (!business) return;
                  section
                    ? updateBusinessSection.fetch(
                        {
                          routeName: business.routeName,
                          sectionId: section._id,
                          data: value,
                        },
                        { onAfterSuccess }
                      )
                    : addBusinessSection.fetch(
                        { routeName: business.routeName, data: value },
                        { onAfterSuccess }
                      );
                }}
                variant="primary"
                className="w-full"
              />
            )}
          </form>
        );
      }}
    </Formux>
  );
};

export default ComponentLink;
