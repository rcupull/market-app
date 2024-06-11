import { CheckEditor, CheckEditorProps } from 'components/check-editor';
import { FormFieldWrapper, FormFieldWrapperProps } from 'components/form-field-wrapper';
import { useFormField } from 'components/formux/useFormField';

import { StyleProps } from 'types/general';
export interface FieldCheckEditorProps extends StyleProps, FormFieldWrapperProps {
  onChange?: (value: string) => void;
  name?: string;
  checkEditorProps?: Partial<CheckEditorProps>;
}

export const FieldCheckEditor = (props: FieldCheckEditorProps) => {
  const { label, className, description, onChange, checkEditorProps = {} } = props;

  const { field, error } = useFormField(props);
  const { value } = field;

  return (
    <FormFieldWrapper label={label} error={error} className={className} description={description}>
      <CheckEditor
        value={value}
        onBlur={() => {
          field.onBlur({ target: { name: field.name } });
        }}
        onChange={({ data }) => {
          onChange?.(data);

          field.onChange({
            target: {
              name: field.name,
              value: data,
            },
          });
        }}
        {...checkEditorProps}
      />
    </FormFieldWrapper>
  );
};
