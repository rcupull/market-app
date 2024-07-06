import { NlpRecordModel } from '../../schemas/nlpRecord';
import { RequestHandler } from '../../types/general';
import { withTryCatch } from '../../utils/error';
import { nlpRecords } from './utils';

const post_nlp_train: () => RequestHandler = () => {
  return (req, res) => {
    withTryCatch(req, res, async () => {
      const record = new NlpRecordModel({
        data: nlpRecords,
      });

      await record.save();

      res.send({});
    });
  };
};

export const nlpHandles = {
  post_nlp_train,
};
