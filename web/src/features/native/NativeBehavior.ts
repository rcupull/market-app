import { useEffect } from 'react';

import { onCloseCheckingChangeBackDrop } from 'features/modal/closeContext/CloseContextProvider';
import { useModal } from 'features/modal/useModal';

import { usePersistentValue } from 'hooks/usePersistentValue';

import { useRouter } from '../../hooks/useRouter';

import { App, URLOpenListenerEvent } from '@capacitor/app';

const NativeBehavior = () => {
  const router = useRouter();
  const modal = useModal();

  const refRouter = usePersistentValue(router, [router.pathname]);
  const refModal = usePersistentValue(modal);

  ////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    App.addListener('backButton', () => {
      const { pathname, onBack } = refRouter.current;
      const { onIsOpen } = refModal.current;

      if (onIsOpen()) {
        return onCloseCheckingChangeBackDrop();
      }

      if (pathname !== '/') {
        return onBack();
      }

      App.exitApp();
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
