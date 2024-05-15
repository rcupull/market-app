import { Formik } from 'components/formik';

import { ChildrenProp } from 'types/general';

interface FormikWrapper extends ChildrenProp {}

export const FormikWrapper = ({ children }: FormikWrapper) => {
  return (
    <Formik initialValues={{}}>
      {({ values }) => {
        console.log('Formik values in the story: ', values);
        return <form>{children}</form>;
      }}
    </Formik>
  );
};
