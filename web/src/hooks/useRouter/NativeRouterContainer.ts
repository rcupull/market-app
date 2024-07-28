import { useEffect } from 'react';

import { usePersistentValue } from 'hooks/usePersistentValue';

import { useRouter } from '.';

import { App } from '@capacitor/app';

const NativeBrowserContainer = () => {
  const router = useRouter();

  const refRouter = usePersistentValue(router, [router.pathname]);

  useEffect(() => {
    App.addListener('backButton', () => {
      const { pathname, onBack } = refRouter.current;

      if (pathname === '/') {
        App.exitApp();
      } else {
        onBack();
      }
    });

    return () => {
      App.removeAllListeners();
    };
  }, []);

  return null;
};

export default NativeBrowserContainer;
