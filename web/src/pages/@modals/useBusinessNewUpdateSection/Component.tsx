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

import { useGetFormErrors } from 'hooks/useGetFormErrors';
import { Portal } from 'hooks/usePortal';

import { useBusiness } from '../../@hooks/useBusiness';

import { Formik } from 'formik';
import {
  PostsLayoutSectionPayload,
  useBusinessOwnerUpdate,
} from 'pages/@hooks/useBusinessOwnerUpdate';
import { PostsLayoutSectionVisibility } from 'types/business';
import { StyleProps } from 'types/general';
import { getSectionFromBusiness } from 'utils/business';

type State = PostsLayoutSectionPayload;

export interface ComponentProps extends StyleProps {
  portal: Portal;
  sectionId?: string;
  onAfterSuccess: () => void;
}

export const Component = ({ portal, sectionId, onAfterSuccess, className }: ComponentProps) => {
  const { business } = useBusiness();
  const businessOwnerUpdate = useBusinessOwnerUpdate(business);
  const getFormErrors = useGetFormErrors();

  const { section } = (sectionId && getSectionFromBusiness({ business, sectionId })) || {};

  return (
    <Formik<State>
      initialValues={{
        name: '',
        postCardLayout: undefined,
        postCategoriesTags: [],
        searchLayout: undefined,
        type: 'grid',
        showIn: ['businessPage', 'postPage'],
        ...(section || {}),
      }}
      enableReinitialize
      initialTouched={{
        name: true,
      }}
      onSubmit={() => {}}
      validate={(values) => {
        return getFormErrors(values, [
          {
            field: 'name',
            type: 'required',
          },
        ]);
      }}
    >
      {({ values, isValid }) => {
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
                    <span>Nombre</span>
                    <FieldShowHide
                      name="hiddenName"
                      title={`${values.hiddenName ? 'Mostrar' : 'Ocultar'} el nombre del grupo.`}
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

            <FieldPostCategoriesButtons label="Categorías" name="postCategoriesTags" />

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
                isBusy={businessOwnerUpdate.status.isBusy}
                disabled={!isValid}
                onClick={() =>
                  sectionId
                    ? businessOwnerUpdate.updatePostsLayoutSection(
                        { value: values, sectionId },
                        { onAfterSuccess },
                      )
                    : businessOwnerUpdate.addPostsLayoutSection(
                        { value: values },
                        { onAfterSuccess },
                      )
                }
                variant="primary"
                className="w-full"
              />,
            )}
          </form>
        );
      }}
    </Formik>
  );
};
