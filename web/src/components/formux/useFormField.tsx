import { useForm } from './useForm';

import { get, set } from 'utils/general';

export const useFormField = <Value = any,>(args: {
  name?: string;
}): {
  error?: string;
  getNestedFieldName: (fieldName: string) => string;
  field: {
    value?: Value;
    name?: string;
    onChange: (e: { target: { name?: string; value: Value } }) => void;
    onBlur: (e: { target: { name?: string } }) => void;
  };
} => {
  const { name } = args;
  const { setValue, value, errors, setTouched, touched } = useForm();

  return {
    getNestedFieldName: (fieldName) => `${name}.${fieldName.toString()}`,
    error: name ? errors[name] : undefined,
    field: {
      value: name ? get(value, name) : undefined,
      name,
      onChange: (e) => {
        if (name) {
          const neValue = { ...value };
          set(neValue, name, e.target.value);
          setValue(neValue);
        }
      },
      onBlur: () => {
        if (name) {
          setTouched({ ...touched, [name]: true });
        }
      },
    },
  };
};
