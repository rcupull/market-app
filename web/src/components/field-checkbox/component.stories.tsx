import { FieldCheckbox } from '.';

import { FormikWrapper } from 'utils/storybook';

export default {
  component: FieldCheckbox,
};

export const Default = (): JSX.Element => (
  <FormikWrapper>
    <FieldCheckbox name="field" />
  </FormikWrapper>
);

export const Label = (): JSX.Element => (
  <FormikWrapper>
    <FieldCheckbox name="field" label="Checked" />
  </FormikWrapper>
);

export const Error = (): JSX.Element => (
  <FormikWrapper errors={{ field: 'invalid field' }}>
    <FieldCheckbox name="field" label="Checked" />
  </FormikWrapper>
);
