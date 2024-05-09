import { Badge } from 'components/badge';
import { Button } from 'components/button';
import { FieldCheckbox } from 'components/field-checkbox';
import { FieldRadioGroup } from 'components/field-radio-group';

import { useUpdateOneBusiness } from 'features/api/business/useUpdateOneBusiness';

import { Portal } from 'hooks/usePortal';

import { useBusiness } from '../../@hooks/useBusiness';

import { Formik } from 'formik';
import { Business } from 'types/business';
import { StyleProps } from 'types/general';
import { PostFormField } from 'types/post';
import { isEmpty } from 'utils/general';

interface State extends Pick<Business, 'postFormFields'> {}

export interface ComponentProps extends StyleProps {
  portal: Portal;
  onAfterSuccess?: () => void;
}

export const Component = ({ portal, onAfterSuccess, className }: ComponentProps) => {
  const { business } = useBusiness();

  const { postFormFields = [], routeName } = business || {};

  const { updateOneBusiness } = useUpdateOneBusiness();

  if (!routeName) {
    return <></>;
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row items-center my-4">
        <Badge variant="info" />
        <span className="text-gray-600 ml-0  md:ml-4 mt-4 md:mt-0">
          Estos son los campos del formulario de publicaciones que estarán disponibles a completar
          durante la creación o edición de una publicación. Los campos{' '}
          <span className="font-bold">Nombre del producto</span> ,{' '}
          <span className="font-bold">Categorías</span> e{' '}
          <span className="font-bold">Imágenes</span> no son mostrados porque son obligatorios y
          siempre estarán en el formulario.
        </span>
      </div>

      <Formik<State>
        initialValues={{
          postFormFields,
        }}
        onSubmit={() => {}}
        enableReinitialize
      >
        {({ values, isValid, touched }) => {
          return (
            <form className={className}>
              <FieldRadioGroup<{ value: PostFormField; label: string }>
                id="logoField"
                name="postFormFields"
                optionToValue={({ value }) => value}
                multi
                renderOption={({ item, checked }) => {
                  const { label } = item;
                  return <FieldCheckbox noUseFormik value={checked} label={label} />;
                }}
                items={[
                  {
                    label: 'Diseño de la página',
                    value: 'postPageLayout',
                  },
                  {
                    label: 'Moneda',
                    value: 'currency',
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
                containerClassName="grid  grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4"
              />

              {portal.getPortal(
                <Button
                  label="Guardar"
                  isBusy={updateOneBusiness.status.isBusy}
                  disabled={!isValid || isEmpty(touched)}
                  onClick={() => {
                    if (!business) return;
                    const { postFormFields } = values;

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
      </Formik>
    </div>
  );
};
