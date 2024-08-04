import { FieldClothingSizeSelect } from '.';

import { FormikWrapper } from 'utils/storybook';

export default {
  component: FieldClothingSizeSelect
};

export const Default = (): JSX.Element => (
  <FormikWrapper>
    <FieldClothingSizeSelect name="field" />
  </FormikWrapper>
);

export const Label = (): JSX.Element => (
  <FormikWrapper>
    <FieldClothingSizeSelect name="field" label="Sizes" />
  </FormikWrapper>
);

// export const Error = (): JSX.Element => (
//   <FormikWrapper errors={{ field: 'invalid field' }}>
//     <FieldClothingSizeSelect name="field" label="Sizes" />
//   </FormikWrapper>
// );

export const CustomItems = (): JSX.Element => (
  <FormikWrapper>
    <FieldClothingSizeSelect name="field" label="Sizes" sizesInStock={['2XL', 'L', 'S']} />
  </FormikWrapper>
);

export const Multi = (): JSX.Element => (
  <FormikWrapper>
    <FieldClothingSizeSelect name="field" multi label="Sizes" />
  </FormikWrapper>
);
