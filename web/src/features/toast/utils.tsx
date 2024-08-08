import { Button } from 'components/button';
import { Divider } from 'components/divider';
import { HtmlTextContainer } from 'components/html-text-container';

import { AuthContainer } from 'pages/@common/auth-container';
import { RouterContainer } from 'pages/@common/router-container';
import { PushNotification } from 'types/notifications';
import { ToastMessage } from 'types/toast';
import { getDashboardBusinessShoppingTabRequested, getOneShoppingRoute } from 'utils/business';
import { getDateString } from 'utils/date';
import { cn } from 'utils/general';
import { getIsUserNotificationsAlreadyRead } from 'utils/notifications';

export const notificationToToastMessage = (
  notification: PushNotification,
  options?: { unreadMark?: boolean }
): ToastMessage | null => {
  const { type, routeName, businessName, shoppingId, createdAt } = notification;
  const { unreadMark } = options || {};

  const renderTitle = (title: string) => {
    return (
      <AuthContainer>
        {({ user }) => {
          const alreadyRead = user && getIsUserNotificationsAlreadyRead(notification, user);

          return (
            <div className={cn('flex flex-col mb-3')}>
              <Divider narrow />

              <div className="flex items-center gap-2">
                {title}
                {unreadMark && !alreadyRead && (
                  <span className="text-sm font-bold text-indigo-500">(no leída)</span>
                )}
              </div>

              <span className="text-md font-bold text-gray-500">{businessName}</span>

              <span className="text-xs font-bold text-gray-500">
                {getDateString({ date: createdAt, showTime: true })}
              </span>
            </div>
          );
        }}
      </AuthContainer>
    );
  };

  switch (type) {
    case 'ORDER_WAS_APPROVED': {
      if (!routeName) return null;
      if (!shoppingId) return null;
      if (!businessName) return null;

      return {
        meta: notification,
        title: renderTitle('Orden de compra aceptada'),
        body: (
          <HtmlTextContainer>
            Una orden de compra generada por usted ha sido aceptada.{' '}
            <RouterContainer>
              {({ pushRoute }) => (
                <Button
                  onClick={() => pushRoute(getOneShoppingRoute({ routeName, shoppingId }))}
                  variant="link"
                  label="Ver detalles de la orden de compra"
                />
              )}
            </RouterContainer>
          </HtmlTextContainer>
        )
      };
    }
    case 'NEW_ORDER_WAS_CREATED': {
      if (!routeName) return null;
      if (!businessName) return null;

      return {
        meta: notification,
        title: renderTitle('Orden de compra creada'),
        body: (
          <HtmlTextContainer>
            Una nueva orden de compra ha sido generada. Puede ver los detalles{' '}
            <RouterContainer>
              {({ pushRoute }) => (
                <Button
                  variant="link"
                  label="aqui"
                  className="!inline-block"
                  onClick={() => pushRoute(getDashboardBusinessShoppingTabRequested({ routeName }))}
                />
              )}
            </RouterContainer>
          </HtmlTextContainer>
        )
      };
    }
    default: {
      return null;
    }
  }
};
