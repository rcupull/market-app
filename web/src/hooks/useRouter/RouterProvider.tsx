import { BrowserRouter } from 'react-router-dom';

import { usePlatform } from 'hooks/useCapacitor';

import { ChildrenProp } from 'types/general';
import { dynamic } from 'utils/makeLazy';

const NativeBrowserContainer = dynamic(() => import('./NativeRouterContainer').then((m) => m));

export const RouterProvider = ({ children }: ChildrenProp) => {
  const { isNative } = usePlatform();

  return (
    <BrowserRouter>
      {isNative && <NativeBrowserContainer />}

      {children}
    </BrowserRouter>
  );
};
