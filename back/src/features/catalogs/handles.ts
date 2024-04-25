import { RequestHandler } from "../../types/general";
import { withTryCatch } from "../../utils/error";
import { GOOGLE_IMG_SCRAP } from "google-img-scrap";

/**
 * https://www.npmjs.com/package/google-img-scrap
 * https://stackoverflow.com/questions/54254235/axios-request-failed-with-status-code-429-but-it-is-working-with-postman
 * https://www.npmjs.com/package/retry-axios
 */

const search_image: () => RequestHandler = () => {
  return (req, res) => {
    withTryCatch(req, res, async () => {
      const { query } = req;
      const { search } = query;

      const response = await GOOGLE_IMG_SCRAP({
        search,
      });

      res.send({
        result: response.result,
        search: response.search,
      });
    });
  };
};

export const catalogsHandles = {
  search_image,
};
