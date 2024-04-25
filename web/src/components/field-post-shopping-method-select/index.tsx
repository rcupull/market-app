import { Button } from 'components/button';
import { FieldCheckbox } from 'components/field-checkbox';
import { FieldRadioGroup } from 'components/field-radio-group';
import { FieldSelectProps } from 'components/field-select';
import { FormFieldWrapperProps } from 'components/form-field-wrapper';

import { FormikFieldProps, useFormikField } from 'hooks/useFormikField';

import { useBusiness } from 'pages/@hooks/useBusiness';
import { useBusinessUpdateInfo } from 'pages/@modals/useBusinessUpdateInfo';
import { PostLayoutShoppingMethod } from 'types/business';
import { AnyRecord } from 'types/general';

export interface FieldPostShoppingMethodSelectProps
  extends FormFieldWrapperProps,
    FormikFieldProps<AnyRecord> {}

export const FieldPostShoppingMethodSelect = (props: FieldPostShoppingMethodSelectProps) => {
  const { label, ...omittedProps } = props;
  const { field } = useFormikField(props);

  const businessUpdateInfo = useBusinessUpdateInfo();

  const { business, status, onFetch } = useBusiness();

  const getItems = (): FieldSelectProps<{ value: PostLayoutShoppingMethod }>['items'] => {
    const out: Array<{ value: PostLayoutShoppingMethod }> = [
      {
        value: 'none',
      },
    ];

    if (business?.shoppingStrategy === 'whatsAppWithOwner_pickUpProduct') {
      out.push({
        value: 'whatsApp_xsLink_lgQR',
      });
    }

    if (business?.shoppingStrategy === 'addToCart_whatsAppWithOwner_pickUpProduct') {
      out.push({
        value: 'shoppingCart',
      });
    }

    return out;
  };

  return (
    <FieldRadioGroup<{ value: PostLayoutShoppingMethod }>
      label={
        <div className="flex items-center justify-start flex-wrap">
          {label}
          <Button
            variant="link"
            label="Configuración del negocio"
            onClick={(e) => {
              e.preventDefault();
              if (!business) return;

              businessUpdateInfo.open({
                onAfterSuccess: () => onFetch({ routeName: business.routeName }),
              });
            }}
          />
        </div>
      }
      isBusy={status.isBusy}
      renderOption={({ checked, item }) => {
        const labels: Record<PostLayoutShoppingMethod, string> = {
          none: 'Ninguna',
          whatsApp_xsLink_lgQR: 'Contactar por whatsapp para los detalles de la compra',
          shoppingCart: 'Agregar al carrito',
        };
        return <FieldCheckbox noUseFormik value={checked} label={labels[item.value]} />;
      }}
      optionToValue={({ value }) => value}
      items={getItems()}
      {...field}
      {...omittedProps}
    />
  );
};
