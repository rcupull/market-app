import { withTryCatch } from '../../utils/error';
import { businessServices } from './services';

import {
  get200Response,
  get400Response,
  get404Response,
  getBusinessNotFoundResponse,
  getUserNotFoundResponse,
} from '../../utils/server-response';
import { Business, BusinessSummary, PostCategory } from '../../types/business';
import { postServices } from '../post/services';
import { RequestHandler } from '../../types/general';
import { makeReshaper } from '../../utils/makeReshaper';
import { getPostCategoriesFromBusinessCategories } from './utils';
import { imagesServices } from '../images/services';
import { isEqualIds, movRow } from '../../utils/general';
import { PaginateResult } from '../../middlewares/pagination';
import { ValidationCodeModel } from '../../schemas/auth';

const get_business: () => RequestHandler = () => {
  return (req, res) => {
    withTryCatch(req, res, async () => {
      const { paginateOptions, query } = req;

      const { routeNames, search, userId, includeHidden } = query;

      const out = await businessServices.getAllWithPagination({
        paginateOptions,
        query: {
          routeNames,
          search,
          createdBy: userId,
          hidden: includeHidden ? undefined : false,
        },
      });

      res.send(out);
    });
  };
};

const get_business_summary: () => RequestHandler = () => {
  return (req, res) => {
    withTryCatch(req, res, async () => {
      const { paginateOptions, query } = req;

      const { routeNames, search, userId, includeHidden } = query;

      const business = await businessServices.getAllWithPagination({
        paginateOptions,
        query: {
          routeNames,
          search,
          createdBy: userId,
          hidden: includeHidden ? undefined : false,
        },
      });

      const out: PaginateResult<BusinessSummary> = {
        ...business,
        data: business.data.map(({ routeName, _id, name }) => ({
          name,
          routeName,
          _id,
          bestDiscount: 20,
          mostSelledProductsImages: [],
          salesAmount: 78,
        })),
      };

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
        query: {
          routeName,
        },
      });

      if (!out) {
        return getBusinessNotFoundResponse({ res });
      }

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
        query: {
          routeName,
        },
      });

      if (!business) return getBusinessNotFoundResponse({ res });

      const currentPostCategoriesTags = business.postCategories?.map(({ tag }) => tag);
      const postCategoriesTags = postCategories.map(({ tag }) => tag);

      const missingTags = currentPostCategoriesTags?.reduce((acc, tag) => {
        return postCategoriesTags.includes(tag) ? acc : [...acc, tag];
      }, [] as Array<string>);

      if (missingTags?.length) {
        //
        await postServices.updateMany({
          query: {
            routeName,
          },
          update: {
            $pullAll: {
              postCategoriesTags: missingTags,
            },
          },
        });
        //
        await businessServices.updateOne({
          query: {
            routeName,
          },
          update: {
            $pullAll: {
              'layouts.posts.sections.$[sectionToClean].postCategoriesTags': missingTags,
            },
          },
          options: {
            arrayFilters: [
              {
                'sectionToClean.postCategoriesTags': { $in: missingTags },
              },
            ],
          },
        });
      }

      await businessServices.updateOne({
        query: {
          routeName,
        },
        update: {
          postCategories,
        },
      });

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
      const { user } = req;

      if (!user) {
        return getUserNotFoundResponse({ res });
      }

      const { body } = req;

      const { name, categories, routeName, currency } = body;

      const out = await businessServices.addOne({
        categories,
        name,
        routeName,
        createdBy: user._id,
        postCategories: getPostCategoriesFromBusinessCategories(categories),
        currency,
      });

      if (!out) {
        return get400Response({ res, json: { message: 'the business exist already' } });
      }

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
          newImagesSrcs: [],
          oldImagesSrcs: [business.logo],
        });
      }
      const out = await businessServices.updateOne({
        query: {
          routeName,
          createdBy: user._id,
        },
        update: makeReshaper<Business, Business>({
          name: 'name',
          categories: 'categories',
          hidden: 'hidden',
          socialLinks: 'socialLinks',
          bannerImages: 'bannerImages',
          logo: 'logo',
          layouts: 'layouts',
          aboutUsPage: 'aboutUsPage',
          whatsAppPhoneNumber: 'whatsAppPhoneNumber',
          postFormFields: 'postFormFields',
          shoppingMeta: 'shoppingMeta',
        })(body),
      });

      res.send(out);
    });
  };
};

const put_business_section_reorder: () => RequestHandler = () => {
  return (req, res) => {
    withTryCatch(req, res, async () => {
      const { params, body, business } = req;
      const { routeName } = params;
      const { fromIndex, toIndex } = body;

      if (!business) {
        return getBusinessNotFoundResponse({ res });
      }

      const businessSections = business.layouts?.posts?.sections;

      if (
        !businessSections ||
        businessSections.length < fromIndex ||
        businessSections.length < toIndex
      ) {
        return get400Response({
          res,
          json: {
            message: 'Invalid fromIndex/toIndex',
          },
        });
      }

      await businessServices.updateOne({
        query: {
          routeName,
        },
        update: {
          $set: {
            'layouts.posts.sections': movRow(businessSections, fromIndex, toIndex),
          },
        },
      });

      get200Response({
        res,
        json: {},
      });
    });
  };
};

const post_business_routeName_sections: () => RequestHandler = () => {
  return (req, res) => {
    withTryCatch(req, res, async () => {
      const { params, body } = req;
      const { routeName } = params;

      await businessServices.updateOne({
        query: {
          routeName,
        },
        update: {
          $push: {
            'layouts.posts.sections': body,
          },
        },
      });

      get200Response({
        res,
        json: {},
      });
    });
  };
};

const put_business_routeName_sections_sectionId: () => RequestHandler = () => {
  return (req, res) => {
    withTryCatch(req, res, async () => {
      const { params, body, business } = req;
      const { routeName, sectionId } = params;

      if (!business) {
        return getBusinessNotFoundResponse({ res });
      }

      const currentSection = business.layouts?.posts?.sections?.find((section) =>
        isEqualIds(sectionId, section._id),
      );

      await businessServices.updateOne({
        query: {
          routeName,
        },
        update: {
          $set: {
            'layouts.posts.sections.$[section]': {
              ...(currentSection || {}),
              ...body,
            },
          },
        },
        options: {
          arrayFilters: [
            {
              'section._id': sectionId,
            },
          ],
        },
      });

      get200Response({
        res,
        json: {},
      });
    });
  };
};

const del_business_routeName_sections_sectionId: () => RequestHandler = () => {
  return (req, res) => {
    withTryCatch(req, res, async () => {
      const { params } = req;
      const { routeName, sectionId } = params;

      await businessServices.updateOne({
        query: {
          routeName,
        },
        update: {
          $pull: {
            'layouts.posts.sections': {
              _id: sectionId,
            },
          },
        },
      });

      get200Response({
        res,
        json: {},
      });
    });
  };
};

const post_business_routeName_chatbot_validate: () => RequestHandler = () => {
  return async (req, res) => {
    withTryCatch(req, res, async () => {
      const { body, business } = req;
      const { code } = body;

      if (!business) {
        return getBusinessNotFoundResponse({ res });
      }

      const validationCode = await ValidationCodeModel.findOneAndDelete({
        code,
      });

      if (!validationCode) {
        return get404Response({
          res,
          json: {
            message:
              'Este codigo de validación no existe o ya el bot fue verificado con este código',
          },
        });
      }

      const { meta } = validationCode.toJSON();

      if (!meta) {
        return get404Response({
          res,
          json: {
            message: 'No hay metadatos disponibles en este codigo de validación del bot',
          },
        });
      }

      await businessServices.updateOne({
        query: {
          _id: business._id,
        },
        update: {
          telegramBotChat: meta,
        },
      });

      res.send({});
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
  //
  put_business_section_reorder,
  post_business_routeName_sections,
  put_business_routeName_sections_sectionId,
  del_business_routeName_sections_sectionId,

  get_business_summary,

  post_business_routeName_chatbot_validate,
};
