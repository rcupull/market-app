import { FieldInput } from 'components/field-input';
import { FormFieldWrapper, FormFieldWrapperProps } from 'components/form-field-wrapper';
import { useFormField } from 'components/formux/useFormField';

export interface FieldAddressProps extends FormFieldWrapperProps {
  collapsable?: boolean;
  name?: string;
}

export const FieldAddress = (props: FieldAddressProps) => {
  const { getNestedFieldName } = useFormField(props);

  return (
    <FormFieldWrapper {...props}>
      <div className="p-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FieldInput label="Calle" name={getNestedFieldName('street')} />
        <FieldInput label="Municipio" name={getNestedFieldName('municipality')} />
        <FieldInput label="Reparto" name={getNestedFieldName('neighborhood')} />
        <FieldInput label="Número" name={getNestedFieldName('number')} />
        <FieldInput label="Apartamento" name={getNestedFieldName('apartment')} />
        <FieldInput label="Entre calle 1" name={getNestedFieldName('streetBetweenFrom')} />
        <FieldInput label="Entre calle 2" name={getNestedFieldName('streetBetweenTo')} />
        <FieldInput label="Ciudad" name={getNestedFieldName('city')} />
      </div>
    </FormFieldWrapper>
  );
};
