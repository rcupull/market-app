import { Link } from 'react-router-dom';

import { Divider } from 'components/divider';
import { HtmlTextContainer } from 'components/html-text-container';

import { PushNotification } from 'types/notifications';
import { ToastMessage } from 'types/toast';
import { getDashboardBusinessShoppingTabRequested, getOneShoppingRoute } from 'utils/business';
import { getDateString } from 'utils/date';

export const renderToastMessage = (notification: ToastMessage) => {
  const { body, title } = notification;

  return (
    <div className="flex">
      <div className="ms-3">
        <h3 className="text-gray-800 font-semibold text-lg">{title}</h3>
        <div className="text-sm text-gray-700 mt-1">{body}</div>
      </div>
    </div>
  );
};

export const notificationToToastMessage = (notification: PushNotification): ToastMessage | null => {
  const { type, routeName, businessName, shoppingId, createdAt } = notification;

  const renderTitleWithDate = (title: string) => {
    return (
      <div className="flex flex-col mb-3">
        <Divider narrow />
        {title}
        <span className="text-xs font-bold text-gray-600">
          {getDateString({ date: createdAt, showTime: true })}
        </span>
      </div>
    );
  };
  switch (type) {
    case 'ORDER_WAS_APPROVED': {
      if (!routeName) return null;
      if (!shoppingId) return null;
      if (!businessName) return null;

      return {
        title: renderTitleWithDate('Orden de compra aprobada'),
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
      };
    }
    case 'NEW_ORDER_WAS_CREATED': {
      const { routeName, businessName } = notification;

      if (!routeName) return null;
      if (!businessName) return null;

      return {
        title: renderTitleWithDate('Orden de compra creada'),
        body: (
          <HtmlTextContainer>
            Una nueva orden de compra ha sido generada en su negocio{' '}
            <span className="font-bold">{businessName}</span>. Puede ver los detalles{' '}
            <Link to={getDashboardBusinessShoppingTabRequested({ routeName })}>aqui</Link>
          </HtmlTextContainer>
        )
      };
    }
    default: {
      return null;
    }
  }
};
