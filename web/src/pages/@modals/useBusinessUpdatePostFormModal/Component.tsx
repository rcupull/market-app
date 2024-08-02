import { Button } from 'components/button';
import { FieldCheckbox } from 'components/field-checkbox';
import { FieldRadioGroup } from 'components/field-radio-group';
import { Formux } from 'components/formux';
import { HighlightedBox } from 'components/highlighted-box';

import { useUpdateOneBusiness } from 'features/api/business/useUpdateOneBusiness';
import { useCloseContext } from 'features/modal/closeContext/useCloseContext';

import { Portal } from 'hooks/usePortal';

import { useBusiness } from '../../@hooks/useBusiness';

import { Business } from 'types/business';
import { StyleProps } from 'types/general';
import { ProductFormField } from 'types/post';

interface State extends Pick<Business, 'postFormFields'> {}

export interface ComponentProps extends StyleProps {
  portal: Portal;
  onAfterSuccess?: () => void;
}

export const Component = ({ portal, onAfterSuccess, className }: ComponentProps) => {
  const { business } = useBusiness();

  const { postFormFields = [], routeName } = business || {};

  const { updateOneBusiness } = useUpdateOneBusiness();

  const { onChangeUnsavedChanges } = useCloseContext();

  if (!routeName) {
    return <></>;
  }

  return (
    <div>
      <HighlightedBox variant="info">
        <span className="text-center sm:text-left">
          Campos del formulario de los productos que estarán disponibles para completar durante la
          creación o edición del mismo. Los campos{' '}
          <span className="font-bold">Nombre del producto</span> ,{' '}
          <span className="font-bold">Categorías</span> e{' '}
          <span className="font-bold">Imágenes</span> no se muestran porque son obligatorios.
        </span>
      </HighlightedBox>

      <Formux<State>
        value={{
          postFormFields,
        }}
      >
        {({ value, hasChange }) => {
          onChangeUnsavedChanges(hasChange);

          return (
            <form className={className}>
              <FieldRadioGroup<{ value: ProductFormField; label: string; hidden?: boolean }>
                name="postFormFields"
                optionToValue={({ value }) => value}
                multi
                renderOption={({ item, checked }) => {
                  const { label } = item;

                  if (item.hidden) {
                    return null;
                  }

                  return <FieldCheckbox noUseFormik value={checked} label={label} />;
                }}
                items={[
                  {
                    label: 'Nombre',
                    value: 'name',
                    hidden: true,
                  },
                  {
                    label: 'Imágenes',
                    value: 'images',
                    hidden: true,
                  },
                  {
                    label: 'Categorias',
                    value: 'postCategoriesTags',
                    hidden: true,
                  },
                  {
                    label: 'Tallas de ropa',
                    value: 'clothingSizes',
                  },
                  {
                    label: 'Colores',
                    value: 'colors',
                  },
                  {
                    label: 'Descripción',
                    value: 'description',
                  },
                  {
                    label: 'Detalles',
                    value: 'details',
                  },
                  {
                    label: 'Descuento',
                    value: 'discount',
                  },
                  {
                    label: 'Precio',
                    value: 'price',
                  },
                  {
                    label: 'Existencia en almacén',
                    value: 'stockAmount',
                  },
                ]}
                className="mt-6"
                containerClassName="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4"
              />

              {portal.getPortal(
                <Button
                  label="Guardar"
                  isBusy={updateOneBusiness.status.isBusy}
                  formuxSubmit
                  onClick={() => {
                    if (!business) return;
                    const { postFormFields } = value;

                    updateOneBusiness.fetch(
                      {
                        update: {
                          postFormFields,
                        },
                        routeName,
                      },
                      {
                        onAfterSuccess,
                      },
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
    </div>
  );
};

export default Component;
