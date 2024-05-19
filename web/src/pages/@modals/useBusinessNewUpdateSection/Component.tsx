import { ButtonSave } from 'components/button-save';
import { Divider } from 'components/divider';
import { FieldCheckbox } from 'components/field-checkbox';
import { FieldInput } from 'components/field-input';
import { FieldPostCardLayout } from 'components/field-post-card-layout';
import { FieldPostCategoriesButtons } from 'components/field-post-categories-buttons';
import { FieldPostsSectionLayout } from 'components/field-posts-section-layout';
import { FieldRadioGroup } from 'components/field-radio-group';
import { FieldSearchLayout } from 'components/field-search-layout';
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
import { PostType } from 'types/post';
import { getRequiredLabel } from 'utils/form';
import { getRandomHash } from 'utils/general';

type State = PostsLayoutSectionPayload;

export interface ComponentProps extends StyleProps {
  portal: Portal;
  section?: PostsLayoutSection;
  onAfterSuccess: () => void;
  postType?: PostType;
}

export const Component = ({
  portal,
  section,
  onAfterSuccess,
  className,
  postType,
}: ComponentProps) => {
  const { business } = useBusiness();
  const { updateBusinessSection } = useUpdateBusinessSection();
  const { addBusinessSection } = useAddBusinessSection();

  const postForm = (
    <Formux<State>
      value={{
        name: '',
        postCardLayout: {
          images: 'static',
          size: 'medium',
          metaLayout: 'basic',
          discount: 'none',
          name: 'basic',
          price: 'smallerCurrency',
          shoppingMethod: 'shoppingCart',
        },
        postCategoriesTags: [],
        searchLayout: 'none',
        type: 'grid',
        showIn: ['businessPage', 'postPage'],
        postType: 'product',
        ...(section || {}),
      }}
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

            <div className="flex flex-col lg:flex-row items-start justify-between lg:gap-7">
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

              <Divider className="lg:hidden" />

              <FieldPostsSectionLayout name="type" label="Diseño" className="w-full mt-2" />
            </div>

            {/* //////////////////////////////////////////////////////////////////////////////////////////////// */}
            <Divider />

            <FieldPostCategoriesButtons
              description={
                <div>
                  La sección visualizará todos los productos que pertenezcan al menos a una de las
                  categorías asociadas a dicha sección. En caso de no seleccinar ninguna categoria
                  seran mostradas todos los productos del negocio.{' '}
                  <span>Siempre será recomendable clasificar correctamente sus productos.</span>
                </div>
              }
              label="Categorías"
              name="postCategoriesTags"
            />

            {/* //////////////////////////////////////////////////////////////////////////////////////////////// */}
            <Divider />

            <FieldSearchLayout name="searchLayout" label="Diseño de búsqueda" className="w-full" />

            {/* //////////////////////////////////////////////////////////////////////////////////////////////// */}
            <Divider />

            <FieldPostCardLayout
              label="Diseño de las tarjetas de publicaciones"
              name="postCardLayout"
              className="w-full"
            />

            {/* //////////////////////////////////////////////////////////////////////////////////////////////// */}
            <Divider />

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
                        {
                          onAfterSuccess,
                        },
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

  const linkForm = (
    <Formux<State>
      value={{
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
      }}
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

  return postType === 'link' ? linkForm : postForm;
};
