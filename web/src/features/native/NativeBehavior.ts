import { useEffect } from 'react';

import { usePersistentValue } from 'hooks/usePersistentValue';

import { useRouter } from '../../hooks/useRouter';

import { App, URLOpenListenerEvent } from '@capacitor/app';

const NativeBehavior = () => {
  const router = useRouter();

  const refRouter = usePersistentValue(router, [router.pathname]);

  ////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    App.addListener('backButton', () => {
      const { pathname, onBack } = refRouter.current;

      if (pathname === '/') {
        App.exitApp();
      } else {
        onBack();
      }
    });

    /**
     * https://capacitorjs.com/docs/guides/deep-links#react
     */
    App.addListener('appUrlOpen', (event: URLOpenListenerEvent) => {
      const { pushRoute } = refRouter.current;
      const slug = event.url.split('.app').pop();

      if (slug) {
        pushRoute(slug);
      }
    });

    return () => {
      App.removeAllListeners();
    };
  }, []);

  return null;
};

export default NativeBehavior;
