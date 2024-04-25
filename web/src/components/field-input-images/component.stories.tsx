import { FieldInputImages } from '.';

import { FormikWrapper } from 'utils/storybook';

export default {
  component: FieldInputImages,
};

export const Default = (): JSX.Element => (
  <FormikWrapper>
    <FieldInputImages name="field" id="field" />
  </FormikWrapper>
);

export const Label = (): JSX.Element => (
  <FormikWrapper>
    <FieldInputImages name="field" id="field" label="Nombre" />
  </FormikWrapper>
);

export const Error = (): JSX.Element => (
  <FormikWrapper errors={{ field: 'invalid field' }}>
    <FieldInputImages name="field" id="field" label="sNombre" />
  </FormikWrapper>
);

export const Multi = (): JSX.Element => (
  <FormikWrapper>
    <FieldInputImages name="field" id="field" label="Nombre" multi />
  </FormikWrapper>
);

export const MultiWithMax0 = (): JSX.Element => (
  <FormikWrapper>
    <FieldInputImages name="field" id="field" label="Nombre" multi max={0} />
  </FormikWrapper>
);

export const MultiWithMax3 = (): JSX.Element => (
  <FormikWrapper>
    <FieldInputImages name="field" id="field" label="Nombre" multi max={3} />
  </FormikWrapper>
);
