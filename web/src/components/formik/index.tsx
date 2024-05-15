import type { FormikConfig, FormikValues } from 'formik';
import { Formik as FormikBase } from 'formik';

export interface FormikProps<Values extends FormikValues = FormikValues>
  extends Omit<FormikConfig<Values>, 'onSubmit'> {}

export const Formik = <Values extends FormikValues = FormikValues>(props: FormikProps<Values>) => {
  return <FormikBase validateOnMount enableReinitialize onSubmit={() => {}} {...props} />;
};
