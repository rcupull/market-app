import { cloneElement } from 'react';

import { Portal, usePortal } from 'hooks/usePortal';

export const useNextButtonPortal = (
  nextButton: React.ReactElement,
): {
  portal: Portal;
  nextAction: () => void;
} => {
  const portal = usePortal();

  return {
    nextAction: () => nextButton.props.onClick(),
    portal: {
      ...portal,
      getPortal: (node: React.ReactElement) => {
        return portal.getPortal(
          cloneElement(nextButton, {
            onClick: node.props.onClick,
            disabled: node.props.disabled,
            isBusy: node.props.isBusy,
          }),
        );
      },
    },
  };
};
