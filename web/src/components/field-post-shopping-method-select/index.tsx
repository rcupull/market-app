import { Button } from 'components/button';
import { FieldCheckbox } from 'components/field-checkbox';
import { FieldRadioGroup } from 'components/field-radio-group';
import { FieldSelectProps } from 'components/field-select';
import { FormFieldWrapperProps } from 'components/form-field-wrapper';

import { FormikFieldProps, useFormikField } from 'hooks/useFormikField';

import { useBusiness } from 'pages/@hooks/useBusiness';
import { useBusinessUpdateShopping } from 'pages/@modals/useBusinessUpdateShopping';
import { PostLayoutShoppingMethod } from 'types/business';
import { AnyRecord } from 'types/general';

export interface FieldPostShoppingMethodSelectProps
  extends FormFieldWrapperProps,
    FormikFieldProps<AnyRecord> {}

interface Option {
  value: PostLayoutShoppingMethod;
  label: string;
  description?: string;
}
export const FieldPostShoppingMethodSelect = (props: FieldPostShoppingMethodSelectProps) => {
  const { field } = useFormikField(props);

  const businessUpdateShopping = useBusinessUpdateShopping();

  const { business, status, onFetch } = useBusiness();

  const getItems = (): FieldSelectProps<Option>['items'] => {
    const out: Array<Option> = [
      {
        value: 'none',
        label: 'Ninguna',
      },
    ];

    if (business?.shoppingStrategy === 'whatsAppWithOwner_pickUpProduct') {
      out.push({
        value: 'whatsApp_xsLink_lgQR',
        label: 'Contactar por whatsapp',
        description:
          'Se mostrará el link y QR del contacto de whatsapp para que el cliente pueda contactarlo directamente con los detalles del producto.',
      });
    }

    if (business?.shoppingStrategy === 'addToCart_whatsAppWithOwner_pickUpProduct') {
      out.push({
        value: 'shoppingCart',
        label: 'Agregar al carrito',
        description: 'Se dará la opción de agregar el producto al carro de compras del negocio.',
      });
    }

    return out;
  };

  return (
    <FieldRadioGroup<Option>
      description={
        <div>
          <span>
            El método de compra es la forma en que el cliente contactará con usted para la compra de
            su producto.
            <br />
            Las opciones siguientes son las posibles según la estrategia de venta seleccionada en la
            configuración de su negocio.
          </span>
          <Button
            variant="link"
            label="Ver configuración de venta de mi negocio"
            onClick={(e) => {
              e.preventDefault();
              if (!business) return;

              businessUpdateShopping.open({
                onAfterSuccess: () => onFetch({ routeName: business.routeName }),
              });
            }}
            className="mx-auto w-full !mt-3"
          />
        </div>
      }
      isBusy={status.isBusy}
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
      items={getItems()}
      containerClassName="flex items-center flex-wrap gap-4"
      {...field}
      {...props}
    />
  );
};
