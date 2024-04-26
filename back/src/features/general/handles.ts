import { withTryCatch } from "../../utils/error";
import { RequestHandler } from "../../types/general";
import { businessCategoryLabels, businessCategoryTree } from "./constants";

const get_business_categories: () => RequestHandler = () => {
  return (req, res) => {
    withTryCatch(req, res, async () => {
      res.send({
        businessCategoryTree,
        businessCategoryLabels,
      });
    });
  };
};

export const generalHandles = {
  get_business_categories,
};
