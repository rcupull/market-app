import { useState } from 'react';

import { ReviewAverage } from '.';

export default {
  component: ReviewAverage
};

export const Default = (): JSX.Element => {
  const [state, setState] = useState(5);

  return (
    <>
      <ReviewAverage value={state} onChange={setState} />
      <ReviewAverage value={state} onChange={setState} />
    </>
  );
};
