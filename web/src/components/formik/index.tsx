import { useEffect, useRef } from 'react';

import { FormValidations, useGetFormErrors } from 'hooks/useGetFormErrors';

import type { FormikConfig, FormikProps as FormikBaseProps, FormikValues } from 'formik';
import { Formik as FormikBase } from 'formik';
import { isEqual } from 'utils/general';

export interface FormikProps<Values extends FormikValues = FormikValues>
  extends Omit<FormikConfig<Values>, 'onSubmit' | 'validate' | 'children'> {
  validate?: FormValidations<Values>;
  onChange?: (value: Values) => void;
  children?: (args: FormikBaseProps<Values>) => React.ReactNode;
}

export const Formik = <Values extends FormikValues = FormikValues>({
  validate,
  children,
  onChange,
  initialValues,
  ...props
}: FormikProps<Values>) => {
  const getFormErrors = useGetFormErrors<Values>();

  const refValues = useRef<Values>(initialValues);
  const refSetValues = useRef<FormikBaseProps<Values>['setValues']>();

  const hasChange = !isEqual(initialValues, refValues.current);

  useEffect(() => {
    if (hasChange) {
      refValues.current = initialValues;
      refSetValues.current?.(initialValues);
    }
  }, [hasChange]);

  return (
    <FormikBase<Values>
      validateOnMount
      enableReinitialize
      onSubmit={() => {}}
      initialValues={initialValues}
      {...props}
      validate={validate ? (values) => getFormErrors(values, validate) : undefined}
    >
      {(args) => {
        const { values, setValues } = args;

        if (!isEqual(values, refValues.current)) {
          onChange?.(values);
        }

        refValues.current = values;
        refSetValues.current = setValues;

        return children?.(args);
      }}
    </FormikBase>
  );
};
