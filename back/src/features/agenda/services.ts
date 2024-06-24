import Agenda from 'agenda';

import { dbUrl } from '../../config';
import { ValidationCodeModel } from '../../schemas/auth';
import { shoppingServices } from '../shopping/services';

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

agenda.define('deleteOrderInConstruction', async (job : any) => {
  console.log('OK');
  const { orderId } = job.attrs.data;

  const _id = orderId;
  const query = { query: { _id } };
  const order = await shoppingServices.getOne(query);
  if (order && order.state === 'CONSTRUCTION') {
    await shoppingServices.deleteOne(query);
  }
});

export const agendaServices = {
  removeValidationCode: async (args: { code: string; timeout: number }) => {
    const { code, timeout } = args;
    await agenda.schedule(`${timeout} seconds`, 'removeValidationCode', { code });
  },
  scheduleAutoShoppingDelete: async (args: { orderId: string;}) => {
    const { orderId } = args;

    //await agenda.cancel({ name: 'deleteOrderInConstruction', 'data.orderId': orderId })

    await agenda.schedule('10 seconds', 'deleteOrderInConstruction', { orderId });
  }
};
