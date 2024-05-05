import { useMemo } from 'react';

import { Button } from 'components/button';
import { FieldCheckbox } from 'components/field-checkbox';
import { FieldInput } from 'components/field-input';
import { FieldRadioGroup } from 'components/field-radio-group';

import { useUpdateOneBusiness } from 'features/api/business/useUpdateOneBusiness';

import { Portal } from 'hooks/usePortal';

import { useBusiness } from '../../@hooks/useBusiness';

import { Formik } from 'formik';
import SvgArrowRightSolid from 'icons/ArrowRightSolid';
import { BusinessShoppingStrategy } from 'types/business';
import { isEmpty } from 'utils/general';

interface State {
  shoppingStrategy: BusinessShoppingStrategy;
  whatsAppPhoneNumber?: string;
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
      whatsAppPhoneNumber: business?.whatsAppPhoneNumber,
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
            <FieldInput
              label="Contacto de WhatsApp"
              name="whatsAppPhoneNumber"
              placeholder="Teléfono: ej: +53533333"
              className="w-60"
            />

            <FieldRadioGroup<{
              value: BusinessShoppingStrategy;
              label: React.ReactNode;
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
                  label: 'Ninguna',
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
                  label: (
                    <div className="flex items-center">
                      Añadir al carrito
                      <SvgArrowRightSolid className="w-9 h-4 px-2" />
                      Generar orden de compra
                      <SvgArrowRightSolid className="w-9 h-4 px-2" />
                      Contactar por whatsapp
                    </div>
                  ),
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
              containerClassName="flex flex-col gap-2"
              className="mt-6"
            />

            {portal.getPortal(
              <Button
                label="Guardar"
                isBusy={updateOneBusiness.status.isBusy}
                disabled={!isValid || isEmpty(touched)}
                onClick={() => {
                  const { shoppingStrategy, whatsAppPhoneNumber } = values;

                  updateOneBusiness.fetch(
                    {
                      update: {
                        shoppingStrategy,
                        whatsAppPhoneNumber,
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
