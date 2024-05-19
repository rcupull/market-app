import { Formux } from 'components/formux';

import { ChildrenProp } from 'types/general';

interface FormikWrapper extends ChildrenProp {}

export const FormikWrapper = ({ children }: FormikWrapper) => {
  return (
    <Formux value={{}}>
      {({ value }) => {
        console.log('Formik values in the story: ', value);
        return <form>{children}</form>;
      }}
    </Formux>
  );
};
