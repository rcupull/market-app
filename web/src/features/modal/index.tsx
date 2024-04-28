import { useModal } from 'features/modal/useModal';

import { ModalId } from './types';

import { dynamic, LoadableReturn } from 'utils/makeLazy';

const componentRecord: Record<ModalId, LoadableReturn> = {
  Emergent: dynamic(() =>
    import('./components/emergent').then((m) => ({
      default: m.Emergent,
    })),
  ),
  CatalogsSearchImage: dynamic(() =>
    import('./components/catalogs-search-image').then((m) => ({
      default: m.CatalogsSearchImage,
    })),
  ),
  PostNew: dynamic(() => import('./components/post-new').then((m) => ({ default: m.PostNew }))),
  BusinessNew: dynamic(() =>
    import('./components/business-new').then((m) => ({ default: m.BusinessNew })),
  ),
  Confirmation: dynamic(() =>
    import('./components/confirmation').then((m) => ({ default: m.Confirmation })),
  ),
  ProfileUpdate: dynamic(() =>
    import('./components/profile-update').then((m) => ({ default: m.ProfileUpdate })),
  ),
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
