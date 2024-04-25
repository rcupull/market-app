import { FieldTextArea } from '.';

import { FormikWrapper } from 'utils/storybook';

export default {
  component: FieldTextArea,
};

export const Default = (): JSX.Element => (
  <FormikWrapper>
    <FieldTextArea name="field" />
  </FormikWrapper>
);

export const Label = (): JSX.Element => (
  <FormikWrapper>
    <FieldTextArea name="field" label="Nombre" />
  </FormikWrapper>
);

export const Error = (): JSX.Element => (
  <FormikWrapper errors={{ field: 'invalid field' }}>
    <FieldTextArea name="field" label="Nombre" />
  </FormikWrapper>
);
