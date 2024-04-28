import { Button } from 'components/button';
import { Divider } from 'components/divider';
import { FieldClothingSizeSelect } from 'components/field-clothing-size-select';
import { FieldColorSelect } from 'components/field-colors-select';
import { FieldInput } from 'components/field-input';
import { FieldInputImages } from 'components/field-input-images';
import { FieldPostCategoriesButtons } from 'components/field-post-categories-buttons';
import { FieldPostPageLayout } from 'components/field-post-page-layout';
import { FieldPostStockAmount } from 'components/field-post-stock-amount';
import { FieldSelect } from 'components/field-select';
import { FieldTextArea } from 'components/field-text-area';

import { useAddManyImages } from 'features/api/images/useAddManyImages';
import { useAddOnePost } from 'features/api/posts/useAddOnePost';
import { useUpdateOnePost } from 'features/api/posts/useUpdateOnePost';

import { useGetFormErrors } from 'hooks/useGetFormErrors';
import { Portal } from 'hooks/usePortal';

import { Formik } from 'formik';
import { OnAfterSuccess } from 'types/api';
import { Business } from 'types/business';
import { Post, PostCurrency, PostFormState } from 'types/post';
import { getImageEndpoint } from 'utils/api';

export interface PostFormProps {
  portal: Portal;
  //
  business: Business;
  //
  onAfterSuccess: OnAfterSuccess;
  post?: Post | null;
}

export const PostForm = ({
  business,
  //
  portal,
  onAfterSuccess,
  post,
}: PostFormProps) => {
  const { routeName, postFormFields = [] } = business;
  const { addOnePost } = useAddOnePost();
  const { updateOnePost } = useUpdateOnePost();

  const { addManyImages } = useAddManyImages();

  const getFormErrors = useGetFormErrors();

  return (
    <Formik<PostFormState>
      initialValues={{
        name: '',
        price: 0,
        currency: 'CUP',
        details: '',
        description: '',
        colors: [],
        clothingSizes: [],
        images: [],
        postCategoriesTags: [],
        postPageLayout: undefined,
        stockAmount: null,
        ...(post || {}),
      }}
      enableReinitialize
      validate={(values) =>
        getFormErrors(values, [
          {
            field: 'name',
            type: 'required',
          },
        ])
      }
      onSubmit={() => {}}
    >
      {({ values, isValid }) => {
        return (
          <form>
            {/** ALWAYS VISIBLE */}
            <>
              <FieldInput name="name" label="Nombre del producto" />
              <Divider />
            </>

            {postFormFields.includes('description') && (
              <>
                <FieldTextArea label="Descripción" name="description" rows={3} className="mt-6" />
                <Divider />
              </>
            )}

            {postFormFields.includes('details') && (
              <>
                <FieldTextArea
                  id="post_details"
                  name="details"
                  label="Detalles del producto"
                  className="mt-6"
                  rows={3}
                />
                <Divider />
              </>
            )}

            {/** ALWAYS VISIBLE */}
            <>
              <FieldInputImages
                label="Imagen"
                id="images"
                name="images"
                className="mt-6"
                getImageSrc={getImageEndpoint}
                multi
              />
              <Divider />
            </>

            {/** ALWAYS VISIBLE */}
            <>
              <FieldPostCategoriesButtons
                label="Categorías"
                name="postCategoriesTags"
                className="mt-6"
              />
              <Divider />
            </>

            {(postFormFields.includes('price') ||
              postFormFields.includes('currency') ||
              postFormFields.includes('discount') ||
              postFormFields.includes('stockAmount')) && (
              <>
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  <FieldInput
                    id="post_price"
                    name="price"
                    label="Precio"
                    type="number"
                    className="mt-6 w-full"
                  />

                  <FieldSelect<{ currency: PostCurrency }>
                    items={[
                      {
                        currency: 'CUP',
                      },
                      {
                        currency: 'MLC',
                      },
                      {
                        currency: 'USD',
                      },
                    ]}
                    renderOption={({ currency }) => currency}
                    renderValue={({ currency }) => currency}
                    optionToValue={({ currency }) => currency}
                    name="currency"
                    label="Moneda"
                    className="mt-6 w-full"
                  />

                  {postFormFields.includes('discount') && (
                    <FieldInput
                      id="post_discount"
                      name="discount"
                      label="Descuento"
                      type="number"
                      className="mt-6 w-full"
                    />
                  )}

                  {postFormFields.includes('stockAmount') && (
                    <FieldPostStockAmount
                      id="post_stockAmount"
                      name="stockAmount"
                      label="Disponibilidad"
                      className="mt-6 w-full"
                    />
                  )}
                </div>
                <Divider />
              </>
            )}

            {postFormFields.includes('colors') && (
              <>
                <FieldColorSelect label="Colores" name="colors" className="mt-6" multi />
                <Divider />
              </>
            )}

            {postFormFields.includes('clothingSizes') && (
              <>
                <FieldClothingSizeSelect
                  label="Tallas"
                  name="clothingSizes"
                  className="mt-6"
                  multi
                />
                <Divider />
              </>
            )}

            {postFormFields.includes('postPageLayout') && (
              <>
                <FieldPostPageLayout
                  label="Diseño de la página de la publicación"
                  name="postPageLayout"
                  className="w-full"
                />
                <Divider />
              </>
            )}

            {portal.getPortal(
              <Button
                label="Guardar"
                isBusy={addOnePost.status.isBusy || updateOnePost.status.isBusy}
                disabled={!isValid}
                onClick={() => {
                  const {
                    images,
                    currency,
                    description,
                    name,
                    price,
                    clothingSizes,
                    colors,
                    details,
                    postCategoriesTags,
                    discount,
                    postPageLayout,
                    stockAmount,
                  } = values;

                  const handelUpdatePost = (post: Post) => {
                    const { _id: postId } = post;

                    addManyImages.fetch(
                      { images, routeName, postId, userId: post.createdBy },
                      {
                        onAfterSuccess: (images) => {
                          updateOnePost.fetch(
                            {
                              postId,
                              images,
                              currency,
                              description,
                              name,
                              price,
                              clothingSizes,
                              colors,
                              details,
                              postCategoriesTags,
                              discount,
                              postPageLayout,
                              stockAmount,
                            },
                            {
                              onAfterSuccess,
                            },
                          );
                        },
                      },
                    );
                  };
                  const handelAddPost = () => {
                    addOnePost.fetch(
                      {
                        currency,
                        description,
                        name,
                        price,
                        clothingSizes,
                        colors,
                        details,
                        routeName,
                        images: [],
                        discount,
                        postPageLayout,
                        stockAmount,
                      },
                      {
                        onAfterSuccess: (response) => {
                          handelUpdatePost(response);
                        },
                      },
                    );
                  };

                  post ? handelUpdatePost(post) : handelAddPost();
                }}
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
