import { useEffect, useRef } from 'react';

import type { FormikValues } from 'formik';
import { useFormikContext } from 'formik';

export interface FormikContextHandleProps<Values extends FormikValues = FormikValues> {
  onChange?: (value: Values) => void;
  initialValues: Values;
}
export const FormikContextHandle = <Values extends FormikValues = FormikValues>({
  onChange,
  initialValues,
}: FormikContextHandleProps<Values>) => {
  const { values, setValues } = useFormikContext<Values>();
  const refInitialized = useRef(false);


  useEffect(() => {
    if (!refInitialized.current) return;

    onChange?.(values);
  }, [JSON.stringify(values)]);

  useEffect(() => {
    if (!refInitialized.current) return;

    setValues(initialValues);
  }, [JSON.stringify(initialValues)]);

  /**
   * this useEffect must be at the end
   */
  useEffect(() => {
    refInitialized.current = true;
  }, []);

  return null;
};
