import { Button } from 'components/button';
import { Divider } from 'components/divider';
import { FieldCheckbox } from 'components/field-checkbox';
import { FieldClothingSizeSelect } from 'components/field-clothing-size-select';
import { FieldColorSelect } from 'components/field-colors-select';
import { FieldInput } from 'components/field-input';
import { FieldInputImages } from 'components/field-input-images';
import { FieldPostCategoriesButtons } from 'components/field-post-categories-buttons';
import { FieldPostLink } from 'components/field-post-link';
import { FieldPostPageLayout } from 'components/field-post-page-layout';
import { FieldPostStockAmount } from 'components/field-post-stock-amount';
import { FieldRadioGroup } from 'components/field-radio-group';
import { FieldSelect } from 'components/field-select';
import { FieldTextArea } from 'components/field-text-area';

import { useUpdateBusinessSection } from 'features/api/business/useUpdateBusinessSection';
import { useAddManyImages } from 'features/api/images/useAddManyImages';
import { useAddOnePost } from 'features/api/posts/useAddOnePost';
import { useUpdateOnePost } from 'features/api/posts/useUpdateOnePost';

import { useGetFormErrors } from 'hooks/useGetFormErrors';
import { useMemoizedHash } from 'hooks/useMemoizedHash';
import { Portal } from 'hooks/usePortal';

import { useBusiness } from '../../@hooks/useBusiness';

import { imagesDimensions } from 'constants/posts';
import { Formik } from 'formik';
import { StyleProps } from 'types/general';
import { Post, PostCurrency, PostFormState, PostType } from 'types/post';
import { getImageEndpoint } from 'utils/api';
import { addStringToUniqueArray } from 'utils/general';

export interface ComponentProps extends StyleProps {
  portal: Portal;
  post?: Post;
  onAfterSuccess: () => void;
  postType: PostType;
}

export const Component = ({
  portal,
  onAfterSuccess,
  post,
  className,
  postType,
}: ComponentProps) => {
  const { business, onFetch, getSections } = useBusiness();

  const { updateBusinessSection } = useUpdateBusinessSection();
  const { addOnePost } = useAddOnePost();
  const { updateOnePost } = useUpdateOnePost();
  const { addManyImages } = useAddManyImages();

  const updateLinkInSections = async (
    sectionIds: Array<string>,
    linkTag: string,
  ): Promise<void> => {
    if (!business) return;

    if (sectionIds.length) {
      const promises = getSections({ ids: sectionIds }).map((section) => {
        return new Promise<void>((resolve) => {
          if (!section) {
            return resolve();
          }

          updateBusinessSection.fetch(
            {
              routeName: business.routeName,
              sectionId: section._id,
              data: {
                postCategoriesTags: addStringToUniqueArray(
                  section.postCategoriesTags || [],
                  linkTag,
                ),
              },
            },
            {
              onAfterSuccess: () => {
                resolve();
              },
            },
          );
        });
      });

      await Promise.all(promises);
      onFetch({ routeName: business?.routeName });
    }
  };

  const getFormErrors = useGetFormErrors();
  const linkTag = useMemoizedHash();

  if (!business) {
    return <></>;
  }

  const { routeName, postFormFields = [] } = business;

  const productForm = (
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
          <form className={className}>
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
                      {
                        images,
                        routeName,
                        postId,
                        userId: post.createdBy,
                        ...imagesDimensions.cardPost,
                      },
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
                        postType,
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

  const sections = getSections({
    tags: post?.postCategoriesTags || [],
  });

  const linkForm = (
    <Formik<PostFormState & { sectionIds: Array<string> }>
      initialValues={{
        name: '',
        images: [],
        postCategoriesTags: [linkTag],
        postLink: undefined,
        sectionIds: sections.map((section) => section._id),
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
          <form className={className}>
            <FieldInput name="name" label="Nombre del enlace" />
            <Divider />

            <FieldRadioGroup<{ label: string; value: string }>
              label="Incluir en las secciones"
              name="sectionIds"
              className="mt-6"
              items={getSections({ postType: 'link' }).map(({ name, _id }) => ({
                label: name,
                value: _id,
              }))}
              renderOption={({ checked, item }) => {
                return <FieldCheckbox noUseFormik value={checked} label={item.label} />;
              }}
              optionToValue={({ value }) => value}
              multi
            />
            <Divider />

            <FieldPostLink name="postLink" className="mt-6" />
            <Divider />

            <FieldInputImages
              label="Imagen"
              id="images"
              name="images"
              className="mt-6"
              getImageSrc={getImageEndpoint}
              multi
            />
            <Divider />

            {portal.getPortal(
              <Button
                label="Guardar"
                isBusy={
                  addOnePost.status.isBusy ||
                  updateOnePost.status.isBusy ||
                  updateBusinessSection.status.isBusy
                }
                disabled={!isValid}
                onClick={() => {
                  const { images, name, postCategoriesTags, sectionIds, postLink } = values;

                  const handelUpdatePost = (post: Post) => {
                    const { _id: postId } = post;

                    addManyImages.fetch(
                      {
                        images,
                        routeName,
                        postId,
                        userId: post.createdBy,
                        ...imagesDimensions.cardPost,
                      },
                      {
                        onAfterSuccess: (images) => {
                          updateOnePost.fetch(
                            {
                              postId,
                              images,
                              name,
                              postLink,
                            },
                            {
                              onAfterSuccess: async () => {
                                const [linkTag] = postCategoriesTags || [];
                                await updateLinkInSections(sectionIds, linkTag || '<unknow Tag>');

                                onAfterSuccess();
                              },
                            },
                          );
                        },
                      },
                    );
                  };
                  const handelAddPost = () => {
                    addOnePost.fetch(
                      {
                        name,
                        routeName,
                        postCategoriesTags,
                        images: [],
                        postType,
                        postLink,
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

  return postType === 'product' ? productForm : linkForm;
};
