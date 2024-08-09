import { RequestHandler } from '../../types/general';
import { withTryCatch } from '../../utils/error';
import { operationServicesGetAllWithPagination } from './services';

const get_operations: () => RequestHandler = () => {
  return (req, res) => {
    withTryCatch(req, res, async () => {
      const { paginateOptions } = req;

      const out = await operationServicesGetAllWithPagination({
        paginateOptions,
        query: {}
      });

      res.send(out);
    });
  };
};

export const operationHandles = {
  get_operations
};
