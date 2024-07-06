import { withTryCatch } from '../../utils/error';
import {
  businessServicesAddOne,
  businessServicesFindOne,
  businessServicesGetAllWithPagination,
  businessServicesGetShoppingPaymentData,
  businessServicesUpdateOne,
} from './services';

import {
  get200Response,
  get400Response,
  get404Response,
  getBusinessNotFoundResponse,
  getUserNotFoundResponse,
} from '../../utils/server-response';
import {
  Business,
  BusinessDto,
  BusinessSearchDto,
  BusinessSummary,
  PostCategory,
} from '../../types/business';
import { Image, ModelDocument, RequestHandler } from '../../types/general';
import { makeReshaper } from '../../utils/makeReshaper';
import { getPostCategoriesFromBusinessCategories } from './utils';
import { PaginateResult } from '../../middlewares/pagination';
import { ValidationCodeModel } from '../../schemas/auth';
import { isEqualIds, movRow } from '../../utils/general';
import { imagesServicesDeleteOldImages } from '../images/services';
import { postServicesGetOne, postServicesUpdateMany } from '../post/services';
import { nlpServicesProcessMainManager } from '../nlp/services';

const get_business: () => RequestHandler = () => {
  return (req, res) => {
    withTryCatch(req, res, async () => {
      const { paginateOptions, query } = req;

      const { routeNames, search, userId, includeHidden } = query;

      const out = await businessServicesGetAllWithPagination({
        paginateOptions,
        query: {
          routeNames,
          search,
          createdBy: userId,
          hidden: includeHidden === 'true' ? undefined : false,
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

      const paginatedBusiness = await businessServicesGetAllWithPagination({
        paginateOptions,
        query: {
          routeNames,
          search,
          createdBy: userId,
          hidden: includeHidden === 'true' ? undefined : false,
        },
      });

      const getBusinessSummary = async (business: Business): Promise<BusinessSummary> => {
        const { routeName, _id, name } = business;
        const posts = await postServicesGetOne({
          query: {
            routeName,
          },
        });

        const images: Array<Image> = [];

        if (posts?.images?.[0]) {
          images.push(posts?.images?.[0]);
        }

        return {
          name,
          routeName,
          _id,
          bestDiscount: 20,
          images,
          salesAmount: 78,
        };
      };

      const data = await Promise.all(paginatedBusiness.data.map(getBusinessSummary));

      const out: PaginateResult<BusinessSummary> = {
        ...paginatedBusiness,
        data,
      };

      res.send(out);
    });
  };
};

const get_business_search: () => RequestHandler = () => {
  return (req, res) => {
    withTryCatch(req, res, async () => {
      const { query } = req;

      const { search } = query;

      //eslint-disable-next-line
      const nlpResponse = await nlpServicesProcessMainManager({ text: search });

      /**
       * TODO convert ths nlpResponse to a data
       * shoul return a BusinessSearchDto[]
       */

      const out: Array<BusinessSearchDto> = [];

      res.send(out);
    });
  };
};

const get_business_routeName: () => RequestHandler = () => {
  return (req, res) => {
    withTryCatch(req, res, async () => {
      const { params } = req;
      const { routeName } = params;

      const business = await businessServicesFindOne({
        query: {
          routeName,
        },
      });

      if (!business) {
        return getBusinessNotFoundResponse({ res });
      }

      const getBusinessDto = async (business: ModelDocument<Business>): Promise<BusinessDto> => {
        const { shoppingDebit } = await businessServicesGetShoppingPaymentData({ routeName });

        return {
          ...business.toJSON(),
          shoppingDebit,
        };
      };

      const out = await getBusinessDto(business);

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

      const business = await businessServicesFindOne({
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
        await postServicesUpdateMany({
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
        await businessServicesUpdateOne({
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

      await businessServicesUpdateOne({
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

      const out = await businessServicesAddOne({
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
        await imagesServicesDeleteOldImages({
          newImagesSrcs: [],
          oldImagesSrcs: [business.logo],
        });
      }
      const out = await businessServicesUpdateOne({
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
          notificationFlags: 'notificationFlags',
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

      await businessServicesUpdateOne({
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

      await businessServicesUpdateOne({
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
        isEqualIds(sectionId, section._id)
      );

      await businessServicesUpdateOne({
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

      await businessServicesUpdateOne({
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

      await businessServicesUpdateOne({
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
  get_business_search,

  post_business_routeName_chatbot_validate,
};
