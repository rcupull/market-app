import { Formik } from 'formik';
import { ChildrenProp } from 'types/general';

interface FormikWrapper extends ChildrenProp {
  errors?: Record<string, string>;
}

export const FormikWrapper = ({ children, errors = {} }: FormikWrapper) => {
  return (
    <Formik initialValues={{}} onSubmit={() => {}} validate={() => errors}>
      {({ values }) => {
        console.log('Formik values in the story: ', values);
        return <form>{children}</form>;
      }}
    </Formik>
  );
};
