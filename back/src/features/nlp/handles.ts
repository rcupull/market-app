import { Business } from '../../types/business';
import { RequestHandler } from '../../types/general';
import { NlpTrainRecord } from '../../types/nlpRecord';
import { Post } from '../../types/post';
import { withTryCatch } from '../../utils/error';
import { businessServicesGetAll } from '../business/services';
import { postServicesGetAll } from '../post/services';
import { nlpServicesProcessMainManager, nlpServicesTrainMainManager } from './services';
import {
  addBusinessCategoryRecords,
  addBusinessNameRecords,
  addPriceRecords,
  addProductPriceRecords,
  addProductNameRecords,
} from './utils';

const post_nlp_train: () => RequestHandler = () => {
  return (req, res) => {
    withTryCatch(req, res, async () => {
      const allBusiness = await businessServicesGetAll({ query: {} });
      const allPosts = await postServicesGetAll({ query: {} });

      let nllTrainRecord: NlpTrainRecord = {};
      nllTrainRecord = addPriceRecords(nllTrainRecord);

      const addBusinessRecords = (record: NlpTrainRecord, business: Business): NlpTrainRecord => {
        let out = record;
        const { postCategories, name } = business;

        out = addBusinessNameRecords(out, name);

        postCategories?.forEach(({ label }) => {
          out = addBusinessCategoryRecords(out, {
            businessName: name,
            categoryLabel: label,
          });
        });

        return out;
      };

      const addProductsRecords = (record: NlpTrainRecord, post: Post): NlpTrainRecord => {
        let out = record;
        const { name } = post;
        out = addProductNameRecords(out, name);
        out = addProductPriceRecords(out, name);

        return out;
      };

      allBusiness.forEach((business) => {
        nllTrainRecord = addBusinessRecords(nllTrainRecord, business);
      });
      allPosts.forEach((post) => {
        nllTrainRecord = addProductsRecords(nllTrainRecord, post);
      });

      await nlpServicesTrainMainManager({ record: nllTrainRecord });

      res.send({});
    });
  };
};

const get_nlp_search: () => RequestHandler = () => {
  return (req, res) => {
    withTryCatch(req, res, async () => {
      const { query } = req;

      const { search } = query;

      const nlpResponse = await nlpServicesProcessMainManager({ text: search });

      res.send(nlpResponse);
    });
  };
};

export const nlpHandles = {
  post_nlp_train,
  get_nlp_search,
};
