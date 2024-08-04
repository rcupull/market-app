import { Link } from 'react-router-dom';

import { HtmlTextContainer } from 'components/html-text-container';

import { useAuth } from 'features/api-slices/useAuth';
import { useToast } from 'features/toast/useToast';

import { useCallFromAfar } from 'hooks/useCallFromAfar';
import { useRouter } from 'hooks/useRouter';

import { MessagePayload } from 'firebase/messaging';
import { useBusiness } from 'pages/@hooks/useBusiness';
import { useCart } from 'pages/@hooks/useCart';
import { NotificationPayload } from 'types/notifications';
import { getDashboardBusinessShoppingTabRequested, getOneShoppingRoute } from 'utils/business';

export const useNotificationsUtils = () => {
  const { onCallAfar } = useCallFromAfar();
  const cart = useCart();
  const { onFetch, business } = useBusiness();
  const { isAuthenticated } = useAuth();
  const { isDashboardPage } = useRouter();
  const { showMessage } = useToast();

  const onUpdateNotification = (payload: MessagePayload) => {
    const { data } = payload;
    const notificationPayload =
      data?.payload && (JSON.parse(data.payload) as NotificationPayload | undefined);

    if (notificationPayload) {
      const { type } = notificationPayload;

      if (DEVELOPMENT) {
        console.log('notificationPayload', notificationPayload);
      }

      switch (type) {
        case 'POST_AMOUNT_STOCK_CHANGE': {
          const { postId, stockAmountAvailable } = notificationPayload;

          onCallAfar('updatePostAmount', { postId, stockAmountAvailable });
          return;
        }
        case 'ORDER_IN_CONSTRUCTION_WAS_REMOVED': {
          cart.onFetch();
          return;
        }
        case 'ORDER_WAS_APPROVED': {
          const { routeName, businessName, shoppingId } = notificationPayload;

          if (!routeName) return;
          if (!shoppingId) return;
          if (!businessName) return;

          showMessage({
            title: 'Nueva orden de compra',
            body: (
              <HtmlTextContainer>
                Una orden de compra generada por usted en el negocio{' '}
                <span className="font-bold">{businessName}</span> ha sido aprovada. Usted será
                contactado luego por el vendedor para los detalles de la entrega.`{' '}
                <Link to={getOneShoppingRoute({ routeName, shoppingId })}>
                  Ver detalles de la orden de compra
                </Link>
              </HtmlTextContainer>
            )
          });
          return;
        }
        case 'NEW_ORDER_WAS_CREATED': {
          const { routeName, businessName } = notificationPayload;

          if (!routeName) return;
          if (!businessName) return;

          if (isAuthenticated && isDashboardPage && business && business.routeName === routeName) {
            onFetch({ routeName });
          }

          showMessage({
            title: 'Nueva orden de compra',
            body: (
              <HtmlTextContainer>
                Una nueva orden de compra ha sido generada en su negocio{' '}
                <span className="font-bold">{businessName}</span>. Puede ver los detalles{' '}
                <Link to={getDashboardBusinessShoppingTabRequested({ routeName })}>aqui</Link>
              </HtmlTextContainer>
            )
          });
          return;
        }
        default: {
          return;
        }
      }
    }
  };

  return {
    onUpdateNotification
  };
};
