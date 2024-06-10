import { RequestHandler } from '../../types/general';
import { withTryCatch } from '../../utils/error';
import { billingServices } from './services';
import { ServerResponse } from 'http';

const get_bills: () => RequestHandler = () => {
  return (req, res) => {
    withTryCatch(req, res, async () => {
      const { query, paginateOptions } = req;

      const { states } = query;

      const out = await billingServices.getAll({
        paginateOptions,
        states,
      });

      if (out instanceof ServerResponse) return out;

      res.send(out);
    });
  };
};

export const billingHandles = {
  get_bills,
};
