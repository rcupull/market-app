import { FormFieldWrapper, FormFieldWrapperProps } from 'components/form-field-wrapper';
import { useFormField } from 'components/formux/useFormField';
import { IconButtonShowHide } from 'components/icon-button-show-hide';

import { StyleProps } from 'types/general';

export interface FieldShowHideProps extends StyleProps, FormFieldWrapperProps {
  oposite?: boolean;
  title?: string;
  name?: string;
}

export const FieldShowHide = (props: FieldShowHideProps) => {
  const { label, className, oposite, title } = props;

  const { field, error } = useFormField(props);
  const { value } = field;

  return (
    <FormFieldWrapper label={label} error={error} className={className}>
      <IconButtonShowHide
        hidden={oposite ? !value : value}
        title={title}
        onClick={(e) => {
          e.preventDefault();
          field.onChange({
            target: {
              name: field.name,
              value: !value
            }
          });
        }}
      />
    </FormFieldWrapper>
  );
};
