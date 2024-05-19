import { useEffect, useState } from 'react';

import { FormContext } from './context';
import { ContextState, FormErrors, FormProps, FormTouched } from './types';
import { useGetFormErrors } from './useGetFormErrors';

import { AnyRecord } from 'types/general';
import { getFlattenJson, isEmpty } from 'utils/general';

export const Formux = <Value extends AnyRecord = AnyRecord>({
  validate,
  children,
  onChange,
  value,
}: FormProps<Value>) => {
  const getFormErrors = useGetFormErrors<Value>();

  const [formState, setFormState] = useState<Value>(value);
  const [errors, setErrors] = useState<FormErrors<Value>>({});
  const [touched, setTouched] = useState<FormTouched<Value>>({});
  const [isValid, setIsValid] = useState<boolean>(true);

  const handleValidate = (newValue: Value) => {
    if (!validate) return;

    getFormErrors(newValue, validate).then((newErrors) => {
      setErrors(newErrors);

      setIsValid(isEmpty(getFlattenJson(newErrors)));
    });
  };

  useEffect(() => {
    handleValidate(value);
    setFormState(value);
    /**
     * it is important for now not type JSON.stringify(value) in the dependencies array. Maybe in the future
     * this causes a lot of unnecessary re-renders but some time the form not render correctly. Ex: state button in the order tables.
     */
  }, [value]);

  const state: ContextState<Value> = {
    value: formState,
    isValid,
    errors,
    setErrors,
    setTouched,
    touched,
    setValue: (newFormState) => {
      handleValidate(newFormState);
      setFormState(newFormState);

      onChange?.(newFormState);
    },
    resetForm: () => {
      setFormState(value);
    },
  };

  // @ts-expect-error some issue with the state type
  return <FormContext.Provider value={state}>{children(state)}</FormContext.Provider>;
};
