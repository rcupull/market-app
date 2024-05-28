import { useModal } from 'features/modal/useModal';

import { ModalId } from './types';

import { dynamic, LoadableReturn } from 'utils/makeLazy';

const componentRecord: Record<ModalId, LoadableReturn> = {
  Emergent: dynamic(() => import('./components/emergent').then((m) => m)),
  CatalogsSearchImage: dynamic(() => import('./components/catalogs-search-image').then((m) => m)),
  BusinessNew: dynamic(() => import('./components/business-new').then((m) => m)),
  Confirmation: dynamic(() => import('./components/confirmation').then((m) => m)),
  ProfileUpdate: dynamic(() => import('./components/profile-update').then((m) => m)),
};

export const ModalContainer = (): JSX.Element | null => {
  const { allModalData } = useModal();

  return (
    <>
      {allModalData?.map(({ id, props }, index) => {
        const Component = componentRecord[id];
        return !!Component && <Component key={index} {...props} />;
      })}
    </>
  );
};
