//@ts-expect-error types is missing
import { NlpManager } from 'node-nlp';

import { QueryHandle } from '../../types/general';
import { nlpRecords } from './records';
import { NplProcessResponse } from './types';

const manager = new NlpManager({ languages: ['es'] });

export const nlpServicesTrain: QueryHandle = async () => {
  Object.entries(nlpRecords).forEach(([key, value]) => {
    value.forEach((value) => {
      manager.addDocument('es', value, key);
    });
  });

  await manager.train();
  manager.save();
};

export const nlpServicesProcess: QueryHandle<
  {
    text: string;
  },
  NplProcessResponse
> = async ({ text }) => {
  const response = await manager.process('es', text);

  return response;
};
