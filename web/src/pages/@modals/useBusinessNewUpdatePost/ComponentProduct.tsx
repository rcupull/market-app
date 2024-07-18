import { Button } from 'components/button';
import { Divider } from 'components/divider';
import { FieldClothingSizeSelect } from 'components/field-clothing-size-select';
import { FieldColorSelect } from 'components/field-colors-select';
import { FieldInput } from 'components/field-input';
import { FieldInputImages } from 'components/field-input-images';
import { FieldPostCategoriesButtons } from 'components/field-post-categories-buttons';
import { FieldPostStockAmount } from 'components/field-post-stock-amount';
import { FieldTextArea } from 'components/field-text-area';
import { Formux } from 'components/formux';

import { useAddManyImages } from 'features/api/images/useAddManyImages';
import { useAddOnePost } from 'features/api/posts/useAddOnePost';
import { useUpdateOnePost } from 'features/api/posts/useUpdateOnePost';
import { useCloseContext } from 'features/modal/components/emergent/closeContext/useCloseContext';

import { Portal } from 'hooks/usePortal';

import { useBusiness } from '../../@hooks/useBusiness';

import { imagesDimensions } from 'constants/posts';
import { StyleProps } from 'types/general';
import { Post, ProductFormState } from 'types/post';
import { getRequiredLabel } from 'utils/form';
import { isNumber } from 'utils/general';

export interface ComponentProductProps extends StyleProps {
  portal: Portal;
  post?: Post;
  onAfterSuccess: () => void;
  onRefreshPost?: () => void;
}

export const ComponentProduct = ({
  portal,
  onAfterSuccess,
  post,
  className,
  onRefreshPost,
}: ComponentProductProps) => {
  const { business } = useBusiness();

  const { addOnePost } = useAddOnePost();
  const { updateOnePost } = useUpdateOnePost();
  const { addManyImages } = useAddManyImages();

  const initialValue: ProductFormState = {
    name: '',
    price: undefined,
    details: '',
    description: '',
    colors: [],
    clothingSizes: [],
    images: [],
    postCategoriesTags: [],
    stockAmount: null,
    ...(post || {}),
  };

  const closeContext = useCloseContext<ProductFormState>({
    initialValue,
  });

  if (!business) {
    return <></>;
  }

  const { routeName, postFormFields = [] } = business;

  return (
    <Formux<ProductFormState>
      value={initialValue}
      onChange={closeContext.onChangeValue}
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
              <FieldInputImages label="Imagen" id="images" name="images" className="mt-6" multi />
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
                <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 mt-0 sm:mt-6 ">
                  <FieldInput
                    id="post_price"
                    name="price"
                    label={getRequiredLabel('Precio')}
                    type="number"
                    className="w-full"
                  />

                  {postFormFields.includes('discount') && (
                    <FieldInput
                      id="post_discount"
                      name="discount"
                      label="Descuento"
                      type="number"
                      className="w-full"
                    />
                  )}

                  {postFormFields.includes('stockAmount') && (
                    <FieldPostStockAmount
                      onAfterSuccess={onRefreshPost}
                      post={post}
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
                      className="w-full"
                    />
                  )}
                </div>
                <Divider />
              </>
            )}

            {postFormFields.includes('colors') && (
              <>
                <FieldColorSelect label="Colores disponibles" name="colors" className="mt-6" multi />
                <Divider />
              </>
            )}

            {postFormFields.includes('clothingSizes') && (
              <>
                <FieldClothingSizeSelect
                  label="Tallas disponibles"
                  name="clothingSizes"
                  className="mt-6"
                  multi
                />
                <Divider />
              </>
            )}

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
                              stockAmount,
                            },
                            {
                              onAfterSuccess,
                            }
                          );
                        },
                      }
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
                        stockAmount,
                        postType: 'product',
                      },
                      {
                        onAfterSuccess: (response) => {
                          handelUpdatePost(response);
                        },
                      }
                    );
                  };

                  post ? handelUpdatePost(post) : handelAddPost();
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
