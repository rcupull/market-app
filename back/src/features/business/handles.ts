import { withTryCatch } from "../../utils/error";
import { businessServices } from "./services";
import { ServerResponse } from "http";
import {
  get200Response,
  getBusinessNotFoundResponse,
  getUserNotFoundResponse,
} from "../../utils/server-response";
import { Business, PostCategory } from "../../types/business";
import { postServices } from "../post/services";
import { User } from "../../types/user";
import { RequestHandler } from "../../types/general";
import { makeReshaper } from "../../utils/makeReshaper";
import { getPostCategoriesFromBusinessCategories } from "./utils";
import { imagesServices } from "../images/services";

const get_business: () => RequestHandler = () => {
  return (req, res) => {
    withTryCatch(req, res, async () => {
      const { paginateOptions, query } = req;

      const { routeNames, search, userId, includeHidden } = query;

      const out = await businessServices.getAll({
        res,
        req,
        paginateOptions,
        routeNames,
        search,
        createdBy: userId,
        hidden: includeHidden ? undefined : false,
      });

      if (out instanceof ServerResponse) return;

      res.send(out);
    });
  };
};

const get_business_routeName: () => RequestHandler = () => {
  return (req, res) => {
    withTryCatch(req, res, async () => {
      const { params } = req;
      const { routeName } = params;

      const out = await businessServices.findOne({
        res,
        req,
        query: {
          routeName,
        },
      });

      if (out instanceof ServerResponse) return;

      res.send(out);
    });
  };
};

const update_business_post_categories: () => RequestHandler = () => {
  return (req, res) => {
    withTryCatch(req, res, async () => {
      const { params, body } = req;
      const { routeName } = params;
      const { postCategories } = body as {
        postCategories: Array<PostCategory>;
      };

      const business = await businessServices.findOne({
        res,
        req,
        query: {
          routeName,
        },
      });

      if (business instanceof ServerResponse) return business;

      let out = undefined;

      const currentPostCategoriesTags = business.postCategories?.map(
        ({ tag }) => tag
      );
      const postCategoriesTags = postCategories.map(({ tag }) => tag);

      const missingTags = currentPostCategoriesTags?.reduce((acc, tag) => {
        return postCategoriesTags.includes(tag) ? acc : [...acc, tag];
      }, [] as Array<string>);

      if (missingTags?.length) {
        //
        out = await postServices.updateMany({
          res,
          req,
          query: {
            routeName,
          },
          update: {
            $pullAll: {
              postCategoriesTags: missingTags,
            },
          },
        });
        if (out instanceof ServerResponse) return out;

        //
        out = await businessServices.updateOne({
          res,
          req,
          query: {
            routeName,
          },
          update: {
            $pullAll: {
              "layouts.posts.sections.$[sectionToClean].postCategoriesTags":
                missingTags,
            },
          },
          options: {
            arrayFilters: [
              {
                "sectionToClean.postCategoriesTags": { $in: missingTags },
              },
            ],
          },
        });
        if (out instanceof ServerResponse) return out;
      }

      out = await businessServices.updateOne({
        res,
        req,
        query: {
          routeName,
        },
        update: {
          postCategories,
        },
      });

      if (out instanceof ServerResponse) return out;
      /**
       * actualizar posts y secciones que tiene las tags eliminadas
       */

      get200Response({
        res,
        json: {},
      });
    });
  };
};

const post_business: () => RequestHandler = () => {
  return (req, res) => {
    withTryCatch(req, res, async () => {
      const user = req.user as User;

      const { body } = req;

      const { name, categories, routeName } = body;

      const out = await businessServices.addOne({
        categories,
        name,
        routeName,
        createdBy: user._id,
        postCategories: getPostCategoriesFromBusinessCategories(categories),
        res,
        req,
      });

      if (out instanceof ServerResponse) return;

      res.send(out);
    });
  };
};

const put_business_routeName: () => RequestHandler = () => {
  return (req, res) => {
    withTryCatch(req, res, async () => {
      const { user, business } = req;

      if (!user) {
        return getUserNotFoundResponse({ res });
      }

      if (!business) {
        return getBusinessNotFoundResponse({ res });
      }

      const { params, body } = req;
      const { routeName } = params;

      if (body.logo === null && business.logo) {
        await imagesServices.deleteOldImages({
          res,
          req,
          newImagesSrcs: [],
          oldImagesSrcs: [business.logo],
        });
      }
      const out = await businessServices.updateOne({
        res,
        req,
        query: {
          routeName,
          createdBy: user._id,
        },
        update: makeReshaper<Business, Business>({
          name: "name",
          categories: "categories",
          hidden: "hidden",
          socialLinks: "socialLinks",
          bannerImages: "bannerImages",
          logo: "logo",
          layouts: "layouts",
          aboutUsPage: "aboutUsPage",
          whatsAppPhoneNumber: "whatsAppPhoneNumber",
          postFormFields: "postFormFields",
          shoppingStrategy: "shoppingStrategy",
          shoppingMeta: "shoppingMeta",
        })(body),
      });

      if (out instanceof ServerResponse) return;

      res.send(out);
    });
  };
};

const delete_business_routeName: () => RequestHandler = () => {
  return (req, res) => {
    withTryCatch(req, res, async () => {
      const user = req.user as User;
      const { params } = req;

      const { routeName } = params;

      const out = await businessServices.deleteOne({
        res,
        req,
        routeName,
        userId: user._id.toString(),
      });

      if (out instanceof ServerResponse) return;

      res.send();
    });
  };
};

export const businessHandles = {
  get_business,
  get_business_routeName,
  //
  update_business_post_categories,
  //
  post_business,
  put_business_routeName,
  delete_business_routeName,
};
