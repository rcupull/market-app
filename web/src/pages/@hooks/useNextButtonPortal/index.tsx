import { cloneElement } from 'react';

import { StepperBtnProps } from 'components/stepper';

import { Portal, usePortal } from 'hooks/usePortal';

export const useNextButtonPortal = ({
  nextBtnProps,
}: {
  nextBtnProps: StepperBtnProps;
}): {
  portal: Portal;
  nextAction: () => void;
  rightButton: React.ReactNode;
} => {
  const portal = usePortal();

  const { onClick, ...omittedProps } = nextBtnProps;

  return {
    nextAction: () => onClick?.(),
    rightButton: <div ref={portal.ref} />,
    portal: {
      ...portal,
      getPortal: (node: React.ReactElement) => {
        return portal.getPortal(cloneElement(node, omittedProps));
      },
    },
  };
};
