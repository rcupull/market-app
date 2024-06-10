import { CheckEditor, CheckEditorProps } from 'components/check-editor';
import { FormFieldWrapper, FormFieldWrapperProps } from 'components/form-field-wrapper';
import { useFormField } from 'components/formux/useFormField';

import { StyleProps } from 'types/general';
export interface FieldCheckEditorProps extends StyleProps, FormFieldWrapperProps {
  onChange?: (value: string) => void;
  classNameContainer?: string;
  name?: string;
  getUploadAdapter?: CheckEditorProps['getUploadAdapter'];
}

export const FieldCheckEditor = (props: FieldCheckEditorProps) => {
  const { label, className, classNameContainer, description, getUploadAdapter, onChange } = props;

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
          onChange?.(data);

          field.onChange({
            target: {
              name: field.name,
              value: data,
            },
          });
        }}
        getUploadAdapter={getUploadAdapter}
      />
    </FormFieldWrapper>
  );
};
