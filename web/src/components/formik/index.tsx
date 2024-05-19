import { FormValidations, useGetFormErrors } from 'hooks/useGetFormErrors';

import { FormikContextHandle } from './FormikContextHandle';

import type { FormikConfig, FormikProps as FormikBaseProps, FormikValues } from 'formik';
import { Formik as FormikBase } from 'formik';

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
  return (
    <FormikBase<Values>
      validateOnMount
      enableReinitialize
      onSubmit={() => {}}
      initialValues={initialValues}
      {...props}
      validate={validate ? (values) => getFormErrors(values, validate) : undefined}
    >
      {(args) => (
        <>
          <FormikContextHandle<Values> onChange={onChange} initialValues={initialValues} />
          {children?.(args)}
        </>
      )}
    </FormikBase>
  );
};
