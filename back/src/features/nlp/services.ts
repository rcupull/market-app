//@ts-expect-error types is missing
import { NlpManager } from 'node-nlp';

import { QueryHandle } from '../../types/general';
import { nlpRecords } from './utils';
import { NlpTrainRecord, NplProcessResponse } from '../../types/nlpRecord';
import { existsSync, readFileSync } from 'fs';

const manager = new NlpManager({ languages: ['es'] });

export const nlpServicesInit: QueryHandle = async () => {
  await nlpServicesLoadMainManager();
};

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

/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
//////////////////////////MAIN MANAGER///////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////

const mainManager = new NlpManager({ languages: ['es'], nlu: { log: false } });
const mainNlpFileName = 'mainModel.nlp';

export const nlpServicesTrainMainManager: QueryHandle<{ record: NlpTrainRecord }> = async ({
  record,
}) => {
  Object.entries(record).forEach(([key, value]) => {
    value.forEach((value) => {
      mainManager.addDocument('es', value, key);
    });
  });

  await mainManager.train();
  mainManager.save(mainNlpFileName, true);
};

export const nlpServicesLoadMainManager: QueryHandle = async () => {
  if (existsSync(mainNlpFileName)) {
    const data = readFileSync(mainNlpFileName, 'utf8');
    mainManager.import(data);
  }
};

export const nlpServicesProcessMainManager: QueryHandle<
  {
    text: string;
  },
  NplProcessResponse
> = async ({ text }) => {
  const response = await mainManager.process('es', text);

  return response;
};
