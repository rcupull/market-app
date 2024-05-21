import { useForm } from './useForm';

import { get, set } from 'utils/general';

//eslint-disable-next-line
export const useFormField = <Value extends any = any>(args: {
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
  const { setValue, value, errors, setTouched } = useForm();

  return {
    getNestedFieldName: (fieldName) => `${name}.${fieldName.toString()}`,
    error: name ? errors[name] : undefined,
    field: {
      value: name ? get(value, name) : undefined,
      name,
      onChange: (e) => {
        if (!name) return;

        setValue((state) => {
          const newState = { ...state };
          set(newState, name, e.target.value);
          return newState;
        });
      },
      onBlur: () => {
        if (!name) return;

        setTouched((touched) => ({ ...touched, [name]: true }));
      },
    },
  };
};
