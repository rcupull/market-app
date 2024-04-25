import { ButtonSave } from 'components/button-save';
import { Divider } from 'components/divider';
import { FieldInput } from 'components/field-input';
import { FieldPostCardLayout } from 'components/field-post-card-layout';
import { FieldPostCategoriesButtons } from 'components/field-post-categories-buttons';
import { FieldPostsSectionLayout } from 'components/field-posts-section-layout';
import { FieldSearchLayout } from 'components/field-search-layout';
import { FieldSelect } from 'components/field-select';
import { FieldShowHide } from 'components/field-show-hide';

import { useModal } from 'features/modal/useModal';

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
}

export const Component = ({ portal, sectionId }: ComponentProps) => {
  const { business, onFetch } = useBusiness();
  const { onClose } = useModal();
  const businessOwnerUpdate = useBusinessOwnerUpdate(business);
  const getFormErrors = useGetFormErrors();

  if (!business) {
    return <></>;
  }

  const { routeName } = business;

  const onAfterSuccess = () => {
    onFetch({ routeName });
    onClose();
  };

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
            <FieldSelect<{ value: PostsLayoutSectionVisibility }>
              label="Mostrar grupo en"
              renderOption={({ value }) => value}
              renderValue={({ value }) => (
                <div className="rounded-2xl px-2 border border-gray-400">{value}</div>
              )}
              optionToValue={({ value }) => value}
              items={[
                {
                  value: 'businessPage',
                },
                {
                  value: 'postPage',
                },
              ]}
              multi
              name="showIn"
              className="w-full"
            />

            {/* //////////////////////////////////////////////////////////////////////////////////////////////// */}
            <Divider />

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
              className="w-full"
            />

            {/* //////////////////////////////////////////////////////////////////////////////////////////////// */}
            <Divider />

            <FieldPostsSectionLayout name="type" label="Diseño" className="w-full" />

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
