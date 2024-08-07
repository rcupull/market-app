import { useModal } from 'features/modal/useModal';

import { CloseContextProvider } from './closeContext/CloseContextProvider';
import { ModalId } from './types';

import { dynamic, LoadableReturn } from 'utils/makeLazy';

const componentRecord: Record<ModalId, LoadableReturn> = {
  Emergent: dynamic(() => import('./components/emergent').then((m) => m)),
  Confirmation: dynamic(() => import('./components/confirmation').then((m) => m))
};

export const ModalContainer = (): JSX.Element | null => {
  const { allModalData } = useModal();

  return (
    <>
      {allModalData?.map(({ id, props }, index) => {
        const Component = componentRecord[id];

        const last = index === allModalData.length - 1;

        return (
          <CloseContextProvider key={index} last={last}>
            {!!Component && <Component key={index} {...props} />}
          </CloseContextProvider>
        );
      })}
    </>
  );
};
