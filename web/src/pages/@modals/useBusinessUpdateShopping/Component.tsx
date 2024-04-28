import { useMemo } from 'react';

import { Button } from 'components/button';
import { FieldCheckbox } from 'components/field-checkbox';
import { FieldRadioGroup } from 'components/field-radio-group';

import { useUpdateOneBusiness } from 'features/api/business/useUpdateOneBusiness';

import { Portal } from 'hooks/usePortal';

import { useBusiness } from '../../@hooks/useBusiness';

import { Formik } from 'formik';
import { BusinessShoppingStrategy } from 'types/business';
import { isEmpty } from 'utils/general';

interface State {
  shoppingStrategy: BusinessShoppingStrategy;
}

export interface ComponentProps {
  portal: Portal;
  onAfterSuccess?: () => void;
}

export const Component = ({ portal, onAfterSuccess }: ComponentProps) => {
  const { business } = useBusiness();

  const { updateOneBusiness } = useUpdateOneBusiness();

  const initialValues = useMemo<State>(
    () => ({
      shoppingStrategy: business?.shoppingStrategy || 'none',
    }),
    [business],
  );

  if (!business) {
    return <></>;
  }

  const { routeName } = business;

  return (
    <Formik<State> initialValues={initialValues} enableReinitialize onSubmit={() => {}}>
      {({ values, isValid, touched }) => {
        return (
          <form className="w-full">
            <FieldRadioGroup<{
              value: BusinessShoppingStrategy;
              label: string;
              description?: React.ReactNode;
            }>
              label="Estrategia de venta"
              name="shoppingStrategy"
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
              optionToValue={({ value }) => value}
              items={[
                {
                  value: 'none',
                  label: 'Ninguno',
                },
                {
                  value: 'whatsAppWithOwner_pickUpProduct',
                  label: 'Contactar por whatsapp',
                  description: (
                    <div>
                      Este es un método simple, ideal para compras puntuales que{' '}
                      <span className="font-bold">no</span> se venderán por lotes.
                      <br />
                      El procedimiento de venta es por{' '}
                      <span className="font-bold">
                        contacto directo con el proveedor desde la propia publicación del producto.
                      </span>{' '}
                      El cliente debe contactar al proveedor por cada producto que desea comprar.
                    </div>
                  ),
                },
                {
                  value: 'addToCart_whatsAppWithOwner_pickUpProduct',
                  label: 'Añadir al carrito y contactar por whatsapp',
                  description: (
                    <div>
                      El procedimiento es por{' '}
                      <span className="font-bold">
                        contacto directo con el proveedor luego de hacer una orden de compra de los
                        productos previamente agregados al carro.
                      </span>
                      <br />
                      El cliente contacta con al proveedor{' '}
                      <span className="font-bold">una vez por cada orden de compra</span> la cual
                      puede tener varios productos y sus cantidades.
                      <br />
                      Las órdenes de compra son gestionadas en la página de administración del
                      negocio directamente por el proveedor.
                    </div>
                  ),
                },
              ]}
              containerClassName="flex items-center flex-wrap gap-4"
              className="mt-4"
            />

            {portal.getPortal(
              <Button
                label="Guardar"
                isBusy={updateOneBusiness.status.isBusy}
                disabled={!isValid || isEmpty(touched)}
                onClick={() => {
                  const { shoppingStrategy } = values;

                  updateOneBusiness.fetch(
                    {
                      update: {
                        shoppingStrategy,
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
  );
};
