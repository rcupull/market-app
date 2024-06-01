import { useEffect, useMemo, useState } from 'react';

import { FormContext } from './context';
import { ContextState, FormErrors, FormProps, FormTouched } from './types';
import { useGetFormErrors } from './useGetFormErrors';

import { AnyRecord } from 'types/general';
import { deepJsonCopy, getFlattenJson, isEmpty, isEqual } from 'utils/general';

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
  const initialValue = useMemo(() => deepJsonCopy(value), []);

  useEffect(() => {
    setFormState(value);
  }, [JSON.stringify(value)]);

  useEffect(() => {
    onChange?.(formState);
  }, [JSON.stringify(formState)]);

  useEffect(() => {
    if (validate) {
      getFormErrors(formState, validate).then((newErrors) => {
        setErrors(newErrors);
        setIsValid(isEmpty(getFlattenJson(newErrors)));
      });
    } else {
      setErrors({});
      setIsValid(true);
    }
  }, [JSON.stringify([formState, validate])]);

  const getErrors = () => {
    /**
     * Only get errors for touched fields
     */
    return Object.keys(touched).reduce((acc, key) => ({ ...acc, [key]: errors[key] }), {});
  };

  const state: ContextState<Value> = {
    value: formState,
    hasChange: !isEqual(initialValue, formState),
    isValid,
    errors: getErrors(),
    setErrors,
    setTouched,
    touched,
    setValue: setFormState,
    resetForm: () => {
      setFormState(initialValue);
      setErrors({});
      setTouched({});
      setIsValid(true);
    },
  };

  // @ts-expect-error some issue with the state type
  return <FormContext.Provider value={state}>{children(state)}</FormContext.Provider>;
};
