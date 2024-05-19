import { useEffect, useState } from 'react';

import { FormContext } from './context';
import { ContextState, FormErrors, FormProps } from './types';
import { useGetFormErrors } from './useGetFormErrors';

import { AnyRecord } from 'types/general';
import { getFlattenJson, isEmpty } from 'utils/general';

export const Formux = <Value extends AnyRecord = AnyRecord>({
  validate,
  children,
  onChange,
  value: valueProp,
}: FormProps<Value>) => {
  const getFormErrors = useGetFormErrors<Value>();

  const [value, setValue] = useState<Value>({});
  const [errors, setErrors] = useState<FormErrors<Value>>({});
  const [isValid, setIsValid] = useState<boolean>(true);

  useEffect(() => {
    setValue(valueProp);
  }, [JSON.stringify(valueProp)]);

  const state: ContextState<Value> = {
    value,
    isValid,
    errors,
    setErrors,
    setValue: (newValue) => {
      if (validate) {
        getFormErrors(newValue, validate).then((newErrors) => {
          setErrors(newErrors);

          setIsValid(isEmpty(getFlattenJson(newErrors)));
        });
      }

      setValue(newValue);
      onChange?.(newValue);
    },
  };

  return <FormContext.Provider value={state}>{children(state)}</FormContext.Provider>;
};
