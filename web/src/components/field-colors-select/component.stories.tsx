import { FieldColorSelect } from '.';

import { FormikWrapper } from 'utils/storybook';

export default {
  component: FieldColorSelect,
};

export const Default = (): JSX.Element => (
  <FormikWrapper>
    <FieldColorSelect name="field" />
  </FormikWrapper>
);

export const Label = (): JSX.Element => (
  <FormikWrapper>
    <FieldColorSelect name="field" label="Sizes" />
  </FormikWrapper>
);

export const Error = (): JSX.Element => (
  <FormikWrapper errors={{ field: 'invalid field' }}>
    <FieldColorSelect name="field" label="Sizes" />
  </FormikWrapper>
);

export const CustomItems = (): JSX.Element => (
  <FormikWrapper>
    <FieldColorSelect name="field" label="Sizes" items={['white', 'black']} />
  </FormikWrapper>
);

export const Multi = (): JSX.Element => (
  <FormikWrapper>
    <FieldColorSelect name="field" multi label="Sizes" />
  </FormikWrapper>
);
