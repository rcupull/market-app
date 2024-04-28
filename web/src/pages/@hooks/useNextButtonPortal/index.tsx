import { cloneElement } from 'react';

import { Portal, usePortal } from 'hooks/usePortal';

export const useNextButtonPortal = (
  nextButton: React.ReactElement,
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
        const { onClick, disabled, isBusy } = node.props;

        /**
         * If disabled = true not should be changes to call to api and save. Then we call portal with nextButton
         * if disabled = false we call portal with cloneElement for save changes
         */
        return portal.getPortal(
          disabled
            ? cloneElement(nextButton)
            : cloneElement(nextButton, {
                onClick,
                disabled,
                isBusy,
              }),
        );
      },
    },
  };
};
