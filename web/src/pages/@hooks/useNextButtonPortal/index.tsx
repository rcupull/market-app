import { cloneElement } from 'react';

import { Portal, usePortal } from 'hooks/usePortal';

export const useNextButtonPortal = (
  nextButton: React.ReactElement
): {
  portal: Portal;
  nextAction: () => void;
  rightButton: React.ReactNode;
} => {
  const portal = usePortal();

  return {
    nextAction: () => nextButton.props.onClick(),
    rightButton: <div ref={portal.ref} />,
    portal: {
      ...portal,
      getPortal: (node: React.ReactElement) => {
        const { onClick, disabled, isBusy, hasChange } = node.props;

        const el = hasChange
          ? cloneElement(nextButton, {
              onClick,
              disabled,
              isBusy,
            })
          : nextButton;

        return portal.getPortal(el);
      },
    },
  };
};
