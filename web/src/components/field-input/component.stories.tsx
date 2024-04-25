import { FieldInput } from '.';

import { FormikWrapper } from 'utils/storybook';

export default {
  component: FieldInput,
};

export const Default = (): JSX.Element => (
  <FormikWrapper>
    <FieldInput name="field" />
  </FormikWrapper>
);

export const Label = (): JSX.Element => (
  <FormikWrapper>
    <FieldInput name="field" label="Nombre" />
  </FormikWrapper>
);

export const Error = (): JSX.Element => (
  <FormikWrapper errors={{ field: 'invalid field' }}>
    <FieldInput name="field" label="Nombre" />
  </FormikWrapper>
);
