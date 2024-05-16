import { useRef } from 'react';

import { FormValidations, useGetFormErrors } from 'hooks/useGetFormErrors';

import type { FormikConfig, FormikProps as FormikBaseProps, FormikValues } from 'formik';
import { Formik as FormikBase } from 'formik';
import { deepJsonCopy, isEqualObj } from 'utils/general';

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
  ...props
}: FormikProps<Values>) => {
  const getFormErrors = useGetFormErrors<Values>();
  const { initialValues } = props;

  const refValues = useRef<Values>(initialValues);

  return (
    <FormikBase
      validateOnMount
      enableReinitialize
      onSubmit={() => {}}
      {...props}
      validate={validate ? (values) => getFormErrors(values, validate) : undefined}
    >
      {(args) => {
        const { values } = args;

        /**
         * The best found way to coding onChange callback. Maybe Formik has a native onChange callback
         */
        if (!isEqualObj(values, refValues.current)) {
          refValues.current = deepJsonCopy(values);
          onChange?.(values);
        }

        return children?.(args);
      }}
    </FormikBase>
  );
};
