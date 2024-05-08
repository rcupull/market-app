import { FieldCheckbox } from 'components/field-checkbox';
import { FieldRadioGroup } from 'components/field-radio-group';
import { FormFieldWrapperProps } from 'components/form-field-wrapper';

import { FormikFieldProps, useFormikField } from 'hooks/useFormikField';

import SvgCartPlusSolid from 'icons/CartPlusSolid';
import { PostLayoutShoppingMethod } from 'types/business';
import { AnyRecord } from 'types/general';

export interface FieldPostShoppingMethodSelectProps
  extends FormFieldWrapperProps,
    FormikFieldProps<AnyRecord> {}

interface Option {
  value: PostLayoutShoppingMethod;
  label: string;
  description?: React.ReactNode;
}
export const FieldPostShoppingMethodSelect = (props: FieldPostShoppingMethodSelectProps) => {
  const { field } = useFormikField(props);

  return (
    <FieldRadioGroup<Option>
      description={
        <div>
          Se mostrará el botón <SvgCartPlusSolid className="size-6 inline fill-gray-500" /> para
          agregar el producto al carro de compras. Si el grupo tendrá publicaciones de enlace a
          otras paginas no debe tener activa esta opcion.
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
          label: 'Ninguno',
        },
        {
          value: 'shoppingCart',
          label: 'Poder agregar a mi carro de compras',
        },
      ]}
      containerClassName="flex items-center flex-wrap gap-4"
      {...field}
      {...props}
    />
  );
};
