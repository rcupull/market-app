import { Stepper } from 'components/stepper-v2';

import { StepBanner } from './steps/step-banner';
import { StepPostcategories } from './steps/step-post-categories';
import { StepPostForm } from './steps/step-post-form';
import { StepPostsSections } from './steps/step-posts-sections';

export const Component = () => {
  return (
    <Stepper
      items={[
        {
          label: 'Categorías de las publicaciones',
          render: (props) => <StepPostcategories {...props} />,
        },
        {
          label: 'Formulario de publicación',
          render: (props) => <StepPostForm {...props} />,
        },
        {
          label: 'Grupos de publicaciones',
          render: (props) => <StepPostsSections {...props} />,
        },
        {
          label: 'Banner publicitario',
          render: (props) => <StepBanner {...props} />,
        },
      ]}
    />
  );
};
