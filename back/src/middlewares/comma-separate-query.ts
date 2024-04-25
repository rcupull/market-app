import { RequestHandler } from "../types/general";

/**
 * Comma separate query to array
 */
export const commaSeparateQuery: RequestHandler = (req, res, next) => {
  req.query = Object.keys(req.query).reduce((acc, key) => {
    const value = req.query[key] as string;

    if (!value?.includes(",")) {
      return {
        ...acc,
        [key]: value,
      };
    }

    const values = value.split(",");
    return {
      ...acc,
      [key]: values,
    };
  }, {});

  next();
};
