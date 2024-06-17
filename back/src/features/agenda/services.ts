import Agenda from 'agenda';

import { dbUrl } from '../../config';
import { ValidationCodeModel } from '../../schemas/auth';

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

export const agendaServices = {
  removeValidationCode: async (args: { code: string; timeout: number }) => {
    const { code, timeout } = args;
    await agenda.schedule(`${timeout} seconds`, 'removeValidationCode', { code });
  },
};
