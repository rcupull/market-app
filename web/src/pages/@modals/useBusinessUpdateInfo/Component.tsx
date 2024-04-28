import { useMemo } from 'react';

import { Button } from 'components/button';
import { FieldCheckbox } from 'components/field-checkbox';
import { FieldInput } from 'components/field-input';
import { FieldRadioGroup } from 'components/field-radio-group';

import { useUpdateOneBusiness } from 'features/api/business/useUpdateOneBusiness';
import { useModal } from 'features/modal/useModal';

import { FetchOptions } from 'hooks/useFetch';
import { Portal } from 'hooks/usePortal';

import { useBusiness } from '../../@hooks/useBusiness';

import { Formik } from 'formik';
import { BusinessShoppingStrategy } from 'types/business';

interface State {
  face: string;
  instagram: string;
  twitter: string;
  linkedin: string;
  youtube: string;
  whatsAppPhoneNumber: string;
  shoppingStrategy: BusinessShoppingStrategy;
}

export interface ComponentProps {
  portal: Portal;
  options?: FetchOptions;
}

export const Component = ({ portal, options }: ComponentProps) => {
  const { business } = useBusiness();
  const { onClose } = useModal();

  const { updateOneBusiness } = useUpdateOneBusiness();

  const initialValues = useMemo<State>(
    () => ({
      face: business?.socialLinks?.face || '',
      instagram: business?.socialLinks?.instagram || '',
      twitter: business?.socialLinks?.twitter || '',
      linkedin: business?.socialLinks?.linkedin || '',
      youtube: business?.socialLinks?.youtube || '',
      whatsAppPhoneNumber: business?.whatsAppPhoneNumber || '',
      shoppingStrategy: business?.shoppingStrategy || 'none',
    }),
    [business],
  );

  if (!business) {
    return <></>;
  }

  const { routeName } = business;

  const renderFieldLink = (field: React.ReactNode, href: string) => {
    return (
      <div className="flex items-center w-full">
        {field}
        <a href={href} className="text-nowrap ml-2 hyperlink mt-8" target="_blank" rel="noreferrer">
          Ir al link
        </a>
      </div>
    );
  };

  return (
    <Formik<State> initialValues={initialValues} enableReinitialize onSubmit={() => {}}>
      {({ values, isValid }) => {
        return (
          <form className="w-full">
            <FieldInput label="Teléfono" name="whatsAppPhoneNumber" className="w-full mt-4" />

            {renderFieldLink(
              <FieldInput label="Facebook" name="face" className="w-full mt-4" />,
              values.face,
            )}
            {renderFieldLink(
              <FieldInput label="Instagram" name="instagram" className="w-full mt-4" />,
              values.instagram,
            )}
            {renderFieldLink(
              <FieldInput label="Twitter" name="twitter" className="w-full mt-4" />,
              values.twitter,
            )}
            {renderFieldLink(
              <FieldInput label="Linkedin" name="linkedin" className="w-full mt-4" />,
              values.linkedin,
            )}

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
                disabled={!isValid}
                onClick={() => {
                  const {
                    face,
                    instagram,
                    twitter,
                    linkedin,
                    youtube,
                    whatsAppPhoneNumber,
                    shoppingStrategy,
                  } = values;

                  updateOneBusiness.fetch(
                    {
                      update: {
                        whatsAppPhoneNumber,
                        socialLinks: {
                          face,
                          instagram,
                          twitter,
                          linkedin,
                          youtube,
                        },
                        shoppingStrategy,
                      },
                      routeName,
                    },
                    {
                      onAfterSuccess: () => {
                        options?.onAfterSuccess?.({});
                        onClose();
                      },
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
