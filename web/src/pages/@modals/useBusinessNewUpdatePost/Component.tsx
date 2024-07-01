import { Button } from 'components/button';
import { Divider } from 'components/divider';
import { FieldCheckbox } from 'components/field-checkbox';
import { FieldClothingSizeSelect } from 'components/field-clothing-size-select';
import { FieldColorSelect } from 'components/field-colors-select';
import { FieldInput } from 'components/field-input';
import { FieldInputImages } from 'components/field-input-images';
import { FieldPostCategoriesButtons } from 'components/field-post-categories-buttons';
import { FieldPostLink } from 'components/field-post-link';
import { FieldPostStockAmount } from 'components/field-post-stock-amount';
import { FieldRadioGroup } from 'components/field-radio-group';
import { FieldTextArea } from 'components/field-text-area';
import { Formux } from 'components/formux';
import { IconButtonAdd } from 'components/icon-button-add';

import { useUpdateBusinessSection } from 'features/api/business/useUpdateBusinessSection';
import { useAddManyImages } from 'features/api/images/useAddManyImages';
import { useAddOnePost } from 'features/api/posts/useAddOnePost';
import { useUpdateOnePost } from 'features/api/posts/useUpdateOnePost';

import { useMemoizedHash } from 'hooks/useMemoizedHash';
import { Portal } from 'hooks/usePortal';

import { useBusiness } from '../../@hooks/useBusiness';
import { useBusinessNewUpdateSection } from '../useBusinessNewUpdateSection';

import { imagesDimensions } from 'constants/posts';
import { StyleProps } from 'types/general';
import { Post, PostFormState, PostType } from 'types/post';
import { getImageEndpoint } from 'utils/api';
import { getRequiredLabel } from 'utils/form';
import { addStringToUniqueArray, isNumber } from 'utils/general';

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
  const businessNewUpdateSection = useBusinessNewUpdateSection();
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

  const linkTag = useMemoizedHash();

  if (!business) {
    return <></>;
  }

  const { routeName, postFormFields = [] } = business;

  const productForm = (
    <Formux<PostFormState>
      value={{
        name: '',
        price: undefined,
        details: '',
        description: '',
        colors: [],
        clothingSizes: [],
        images: [],
        postCategoriesTags: [],
        postPageLayout: {
          shoppingMethod: undefined,
        },
        stockAmount: null,
        ...(post || {}),
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
        postFormFields.includes('price') && {
          field: 'price',
          type: 'custom',
          customCb: (priceVal) => isNumber(priceVal) && priceVal > 0,
          message: 'Precio inválido',
        },
      ]}
    >
      {({ value, isValid, hasChange }) => {
        return (
          <form className={className}>
            {/** ALWAYS VISIBLE */}
            <>
              <FieldInput
                name="name"
                placeholder='Ej. "Pantalon negro para chicas"'
                label={getRequiredLabel('Nombre del producto')}
              />
              <Divider />
            </>

            {postFormFields.includes('description') && (
              <>
                <FieldTextArea
                  label="Descripción"
                  placeholder='Ej. "Pantalon de vestir con tejido grueso, confeccionado a mano y diseño personalizado."'
                  name="description"
                  rows={3}
                  className="mt-6"
                />
                <Divider />
              </>
            )}

            {postFormFields.includes('details') && (
              <>
                <FieldTextArea
                  id="post_details"
                  name="details"
                  placeholder=' Ej. "Pantalon de excelente confección, elavorado con tejidos completamente cubanos y 100% algodon. Elaborado por el grupo crativo de artesanos y sastres de Pinar."'
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
                label={getRequiredLabel('Categorías')}
                name="postCategoriesTags"
                description={
                  <div>
                    Todos los productos deben tener a al menos una categoría para que puedan ser
                    asociados a una sección de productos en tu negocio.
                  </div>
                }
                className="mt-6"
              />
              <Divider />
            </>

            {(postFormFields.includes('price') ||
              postFormFields.includes('discount') ||
              postFormFields.includes('stockAmount')) && (
              <>
                <div className="flex flex-col sm:flex-row justify-center gap-6">
                  <FieldInput
                    id="post_price"
                    name="price"
                    label={getRequiredLabel('Precio')}
                    type="number"
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
                      description={
                        <div>
                          Marcando la casilla anterior usted puede habilitar el{' '}
                          <span className="font-bold">
                            seguimiento automático de la disponibilidad del producto.
                          </span>{' '}
                          Cada vez que se agregue un producto a un carro de compras, el sistema la
                          actualiza en la página de su negocio, si esta llega a cero el producto
                          queda como <span className="font-bold">no disponible</span> evitando que
                          los usuarios generen nuevas órdenes de compras con este producto.
                        </div>
                      }
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

            {/* {postFormFields.includes('postPageLayout') && (
              <>
                <FieldPostPageLayout
                  label="Página de la publicación"
                  name="postPageLayout"
                  className="w-full"
                />
                <Divider />
              </>
            )} */}

            {portal.getPortal(
              <Button
                label="Guardar"
                isBusy={
                  addOnePost.status.isBusy ||
                  updateOnePost.status.isBusy ||
                  addManyImages.status.isBusy
                }
                disabled={!isValid}
                hasChange={hasChange}
                onClick={() => {
                  const {
                    images,
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
                  } = value;

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
    </Formux>
  );

  const sections = getSections({
    tags: post?.postCategoriesTags || [],
  });

  const linkForm = (
    <Formux<PostFormState & { sectionIds: Array<string> }>
      value={{
        name: '',
        images: [],
        postCategoriesTags: [linkTag],
        postLink: undefined,
        sectionIds: sections.map((section) => section._id),
        ...(post || {}),
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
            <FieldInput name="name" label={getRequiredLabel('Nombre del enlace')} />
            <Divider />

            <FieldRadioGroup<{ label: string; value: string }>
              label={
                <div className="flex items-center">
                  Incluir en las secciones
                  <IconButtonAdd
                    title="Agregar nueva sección de enlaces"
                    className="text-green-600 font-bold ml-2"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      businessNewUpdateSection.open({
                        postType: 'link',
                        onAfterSuccess: () =>
                          business && onFetch({ routeName: business.routeName }),
                      });
                    }}
                  />
                </div>
              }
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
                  updateBusinessSection.status.isBusy ||
                  addManyImages.status.isBusy
                }
                disabled={!isValid}
                onClick={() => {
                  const { images, name, postCategoriesTags, sectionIds, postLink } = value;

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
    </Formux>
  );

  return postType === 'product' ? productForm : linkForm;
};

export default Component;
