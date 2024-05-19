import { useForm } from './useForm';

export const useFormField = (args: {
  name?: string;
}): {
  error?: string;
  getNestedFieldName: (fieldName: string) => string;
  field: {
    value?: any;
    name?: string;
    onChange: (e: { target: { name?: string; value: any } }) => void;
    onBlur: (e: { target: { name?: string } }) => void;
  };
} => {
  const { name } = args;
  const { setValue, value, errors } = useForm();

  return {
    getNestedFieldName: (fieldName) => `${name}.${fieldName.toString()}`,
    error: name ? errors[name] : undefined,
    field: {
      value: name ? value[name] : undefined,
      name,
      onChange: (e) => {
        if (name) {
          setValue({ ...value, [name]: e.target.value });
        }
      },
      onBlur: () => {},
    },
  };
};
