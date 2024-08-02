import { ButtonSave } from 'components/button-save';
import { Divider } from 'components/divider';
import { FieldCheckbox } from 'components/field-checkbox';
import { FieldInput } from 'components/field-input';
import { FieldPostCardLayout } from 'components/field-post-card-layout';
import { FieldPostCategoriesButtons } from 'components/field-post-categories-buttons';
import { FieldPostsSectionLayout } from 'components/field-posts-section-layout';
import { FieldSearchLayout } from 'components/field-search-layout';
import { FieldShowHide } from 'components/field-show-hide';
import { FormFieldWrapper } from 'components/form-field-wrapper';
import { Formux } from 'components/formux';

import { useAddBusinessSection } from 'features/api/business/useAddBusinessSection';
import { useUpdateBusinessSection } from 'features/api/business/useUpdateBusinessSection';
import { useCloseContext } from 'features/modal/closeContext/useCloseContext';

import { Portal } from 'hooks/usePortal';

import { useBusiness } from 'pages/@hooks/useBusiness';
import { PostsLayoutSection, PostsLayoutSectionPayload } from 'types/business';
import { StyleProps } from 'types/general';
import { getRequiredLabel } from 'utils/form';

type State = PostsLayoutSectionPayload;

export interface ComponentProductProps extends StyleProps {
  portal: Portal;
  section?: PostsLayoutSection;
  onAfterSuccess: () => void;
}

export const ComponentProduct = ({
  portal,
  section,
  onAfterSuccess,
  className,
}: ComponentProductProps) => {
  const { business } = useBusiness();
  const { updateBusinessSection } = useUpdateBusinessSection();
  const { addBusinessSection } = useAddBusinessSection();

  const { onChangeUnsavedChanges } = useCloseContext();

  return (
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
        showMobile: true,
        showPC: true,
        postType: 'product',
        ...(section || {}),
      }}
      validate={[
        {
          field: 'name',
          type: 'required',
        },
        {
          field: 'postCategoriesTags',
          type: 'custom',
          customCb: (value) => value?.length,
          message: 'Debe seleccionar al menos una categoría',
        },
      ]}
    >
      {({ value, hasChange }) => {
        onChangeUnsavedChanges(hasChange);

        return (
          <form className={className}>
            <FormFieldWrapper label="Visibilidad">
              <div className="flex gap-4">
                <FieldCheckbox label="Mostrar en móviles" name="showMobile" />
                <FieldCheckbox label="Mostrar en PC" name="showPC" />
              </div>
            </FormFieldWrapper>

            {/* //////////////////////////////////////////////////////////////////////////////////////////////// */}
            <Divider />

            <div className="flex flex-col lg:flex-row items-start justify-between lg:gap-7">
              <FieldInput
                name="name"
                placeholder='Ejemplo: "Ofertas de verano"'
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
                  categorías asociadas, en caso de no seleccinar ninguna se mostrarán todos los
                  productos del negocio.{' '}
                  <span>Siempre será recomendable clasificar correctamente sus productos.</span>
                </div>
              }
              label={getRequiredLabel('Categorías')}
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
                formuxSubmit
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
                        }
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

export default ComponentProduct;
