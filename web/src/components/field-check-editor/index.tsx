import { CheckEditor } from 'components/check-editor';
import { FormFieldWrapper, FormFieldWrapperProps } from 'components/form-field-wrapper';
import { useFormField } from 'components/formux/useFormField';

import { FormikFieldProps } from 'hooks/useFormikField';

import { StyleProps } from 'types/general';
export interface FieldCheckEditorProps
  extends StyleProps,
    FormFieldWrapperProps,
    FormikFieldProps<string> {
  onChange?: (e: React.ChangeEvent) => void;
  classNameContainer?: string;
}

export const FieldCheckEditor = (props: FieldCheckEditorProps) => {
  const { label, className, classNameContainer, description } = props;

  const { field, error } = useFormField(props);
  const { value } = field;

  return (
    <FormFieldWrapper label={label} error={error} className={className} description={description}>
      <CheckEditor
        value={value}
        classNameContainer={classNameContainer}
        onBlur={() => {
          field.onBlur({ target: { name: field.name } });
        }}
        onChange={({ data }) => {
          field.onChange({
            target: {
              name: field.name,
              value: data,
            },
          });
        }}
      />
    </FormFieldWrapper>
  );
};
