import * as all from '../../features/notifications/services';

export const mockNotificationsServicesSendNewOrderPushMessage = (): {
  notificationsServicesSendNewOrderPushMessage: jest.SpyInstance;
} => {
  const notificationsServicesSendNewOrderPushMessage = jest
    .spyOn(all, 'notificationsServicesSendNewOrderPushMessage')
    .mockImplementation(jest.fn());

  return { notificationsServicesSendNewOrderPushMessage };
};

export const mockNotificationsServicesSendOrderInConstructionWasRemoved = (): {
  notificationsServicesSendOrderInConstructionWasRemoved: jest.SpyInstance;
} => {
  const notificationsServicesSendOrderInConstructionWasRemoved = jest
    .spyOn(all, 'notificationsServicesSendOrderInConstructionWasRemoved')
    .mockImplementation(jest.fn());

  return { notificationsServicesSendOrderInConstructionWasRemoved };
};

export const mockNotificationsServicesSendUpdateStockAmountMessage = (): {
  notificationsServicesSendUpdateStockAmountMessage: jest.SpyInstance;
} => {
  const notificationsServicesSendUpdateStockAmountMessage = jest
    .spyOn(all, 'notificationsServicesSendUpdateStockAmountMessage')
    .mockImplementation(jest.fn());

  return { notificationsServicesSendUpdateStockAmountMessage };
};
