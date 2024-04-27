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
import { getSectionFromBusiness } from 'utils/business';

type State = PostsLayoutSectionPayload;

export interface ComponentProps {
  portal: Portal;
  sectionId?: string;
  onAfterSuccess: () => void;
}

export const Component = ({ portal, sectionId, onAfterSuccess }: ComponentProps) => {
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
        showIn: [],
        ...(section || {}),
      }}
      enableReinitialize
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
          <form>
            <FieldRadioGroup<{ value: PostsLayoutSectionVisibility }>
              label="Mostrar grupo en"
              renderOption={({ checked, item }) => {
                return <FieldCheckbox noUseFormik value={checked} label={item.value} />;
              }}
              multi
              optionToValue={({ value }) => value}
              items={[
                {
                  value: 'businessPage',
                },
                {
                  value: 'postPage',
                },
              ]}
              name="showIn"
              containerClassName="flex items-center gap-4"
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
                      className='-my-2'
                    />
                  </div>
                }
                className="w-full"
              />

              <Divider className="lg:hidden" />

              <FieldPostsSectionLayout name="type" label="Diseño" className="w-full" />
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
