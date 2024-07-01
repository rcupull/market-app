import { FieldInput } from 'components/field-input';
import { FormFieldWrapper, FormFieldWrapperProps } from 'components/form-field-wrapper';
import { useFormField } from 'components/formux/useFormField';

export interface FieldAddressProps extends FormFieldWrapperProps {
  collapsable?: boolean;
  name?: string;
}

export const FieldAddress = (props: FieldAddressProps) => {
  const { getNestedFieldName } = useFormField(props);

  const getImportantLabel = (label: string) => {
    return (
      <>
        {label}
        <span className="text-red-500 text-xs ml-2 font-normal">(Importante)</span>
      </>
    );
  };
  return (
    <FormFieldWrapper {...props}>
      <div className="p-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FieldInput label={getImportantLabel('Calle')} name={getNestedFieldName('street')} />
        <FieldInput
          label={getImportantLabel('Municipio')}
          name={getNestedFieldName('municipality')}
        />
        <FieldInput label="Reparto" name={getNestedFieldName('neighborhood')} />
        <FieldInput label={getImportantLabel('Número')} name={getNestedFieldName('number')} />
        <FieldInput
          label={getImportantLabel('Apartamento')}
          name={getNestedFieldName('apartment')}
        />
        <FieldInput label="Entre calle 1" name={getNestedFieldName('streetBetweenFrom')} />
        <FieldInput label="Entre calle 2" name={getNestedFieldName('streetBetweenTo')} />
        <FieldInput label={getImportantLabel('Ciudad')} name={getNestedFieldName('city')} />
      </div>
    </FormFieldWrapper>
  );
};
