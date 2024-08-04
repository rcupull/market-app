import { FieldCheckbox } from 'components/field-checkbox';
import { FieldRadioGroup } from 'components/field-radio-group';
import { FormFieldWrapperProps } from 'components/form-field-wrapper';

import SvgCartPlusSolid from 'icons/CartPlusSolid';
import { PostLayoutShoppingMethod } from 'types/business';

export interface FieldPostShoppingMethodSelectProps extends FormFieldWrapperProps {
  name?: string;
}

interface Option {
  value: PostLayoutShoppingMethod;
  label: string;
  description?: React.ReactNode;
}
export const FieldPostShoppingMethodSelect = (props: FieldPostShoppingMethodSelectProps) => {
  return (
    <FieldRadioGroup<Option>
      description={
        <div>
          Se mostrará el botón <SvgCartPlusSolid className="size-6 inline fill-gray-500" /> para
          agregar el producto al carro de compras. Se recomienda activarla para mejorar la
          experiencia del usuario en la plataforma.
        </div>
      }
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
          label: 'Ninguno'
        },
        {
          value: 'shoppingCart',
          label: 'Carro de compras'
        }
      ]}
      containerClassName="flex items-center flex-wrap gap-4"
      {...props}
    />
  );
};
