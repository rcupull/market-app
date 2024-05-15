import { FormValidations, useGetFormErrors } from 'hooks/useGetFormErrors';

import type { FormikConfig, FormikValues } from 'formik';
import { Formik as FormikBase } from 'formik';

export interface FormikProps<Values extends FormikValues = FormikValues>
  extends Omit<FormikConfig<Values>, 'onSubmit' | 'validate'> {
  validate?: FormValidations<Values>;
}

export const Formik = <Values extends FormikValues = FormikValues>({
  validate,
  ...props
}: FormikProps<Values>) => {
  const getFormErrors = useGetFormErrors<Values>();

  return (
    <FormikBase
      validateOnMount
      enableReinitialize
      onSubmit={() => {}}
      {...props}
      validate={validate ? (values) => getFormErrors(values, validate) : undefined}
    />
  );
};
