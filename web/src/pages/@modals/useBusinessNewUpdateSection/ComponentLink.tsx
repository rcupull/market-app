import { useState } from 'react';

import { ButtonSave } from 'components/button-save';
import { Divider } from 'components/divider';
import { FieldCheckbox } from 'components/field-checkbox';
import { FieldInput } from 'components/field-input';
import { FieldRadioGroup } from 'components/field-radio-group';
import { FieldShowHide } from 'components/field-show-hide';
import { Formux } from 'components/formux';

import { useAddBusinessSection } from 'features/api/business/useAddBusinessSection';
import { useUpdateBusinessSection } from 'features/api/business/useUpdateBusinessSection';

import { Portal } from 'hooks/usePortal';

import { useBusiness } from 'pages/@hooks/useBusiness';
import {
  PostsLayoutSection,
  PostsLayoutSectionPayload,
  PostsLayoutSectionVisibility,
} from 'types/business';
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
    showIn: ['businessPage', 'postPage'],
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
            <FieldRadioGroup<{
              value: PostsLayoutSectionVisibility;
              label: string;
              description?: React.ReactNode;
            }>
              label="Visible en:"
              renderOption={({ checked, item }) => {
                return (
                  <FieldCheckbox
                    noUseFormik
                    value={checked}
                    label={item.label}
                    description={item.description}
                  />
                );
              }}
              multi
              optionToValue={({ value }) => value}
              items={[
                {
                  value: 'businessPage',
                  label: 'Página del negocio',
                  description: (
                    <div>
                      En la página del negocio serán mostrados todos los grupos que{' '}
                      <span className="font-bold">no esten ocultos</span> y que tengan la{' '}
                      <span className="font-bold">visibilidad</span> activada en la página del
                      negocio.
                    </div>
                  ),
                },
                {
                  value: 'postPage',
                  label: 'Páginas de las publicaciones',
                  description: (
                    <div>
                      Como parte del contenido de la{' '}
                      <span className="font-bold">página de la publicación</span> serán mostrados
                      todos los grupos que tengan la <span className="font-bold">visibilidad</span>{' '}
                      activada en dicha página.
                      <br />
                      Durante la creación/edición de una publicacion usted puede escoger cuales
                      grupos quiere que se vean como{' '}
                      <span className="font-bold ml-1">
                        publicaciones relacionadas o similares
                      </span>{' '}
                      a la publicación actual.
                    </div>
                  ),
                },
              ]}
              name="showIn"
              containerClassName="flex flex-col sm:flex-row sm:items-center sm:gap-4"
            />

            {/* //////////////////////////////////////////////////////////////////////////////////////////////// */}
            <Divider />

            <FieldInput
              name="name"
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
                        { onAfterSuccess },
                      )
                    : addBusinessSection.fetch(
                        { routeName: business.routeName, data: value },
                        { onAfterSuccess },
                      );
                }}
                variant="primary"
                className="w-full"
              />,
            )}
          </form>
        );
      }}
    </Formux>
  );
};
