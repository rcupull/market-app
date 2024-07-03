import Agenda from 'agenda';

import { dbUrl } from '../../config';
import { ValidationCodeModel } from '../../schemas/auth';
import {
  shoppingServicesFindOneAndDelete,
  shoppingServicesSendUpdateStockAmountMessagesFromShoppingPosts,
} from '../shopping/services';
import { ShoppingState } from '../../types/shopping';
import { notificationsServicesSendOrderInConstructionWasRemoved } from '../notifications/services';

export const agenda = new Agenda({ db: { address: dbUrl }, processEvery: '10 seconds' });

const removeJobById = async (id: string) => {
  const jobs = await agenda.jobs({ _id: id });
  if (jobs[0]) {
    jobs[0].remove();
  }
};

agenda.define('removeValidationCode', async (job: any): Promise<void> => {
  const { code } = job.attrs.data;

  if (code) {
    await ValidationCodeModel.deleteOne({
      code,
    });
  }

  await removeJobById(job.attrs._id);
});

agenda.on('ready', async () => {
  await agenda.start();
});

agenda.define('removeOrderInConstruction', async (job: any) => {
  const { orderId } = job.attrs.data;

  const shopping = await shoppingServicesFindOneAndDelete({
    query: {
      _id: orderId,
      state: ShoppingState.CONSTRUCTION,
    },
  });

  if (shopping) {
    await shoppingServicesSendUpdateStockAmountMessagesFromShoppingPosts({ shopping });
    await notificationsServicesSendOrderInConstructionWasRemoved({ shopping });
  }
});

export const agendaServices = {
  scheduleRemoveValidationCode: async (args: { code: string; timeout: number }) => {
    const { code, timeout } = args;
    await agenda.schedule(`${timeout} seconds`, 'removeValidationCode', { code });
  },
  scheduleRemoveOrderInConstruction: async (args: { orderId: string }) => {
    const { orderId } = args;

    await agenda.cancel({ name: 'removeOrderInConstruction', 'data.orderId': orderId });
    await agenda.schedule('10 minutes', 'removeOrderInConstruction', { orderId });
  },
};
