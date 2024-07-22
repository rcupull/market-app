import { Router } from 'express';
import { middlewareExpressValidator } from '../../middlewares/middlewareExpressValidator';
import { middlewarePagination } from '../../middlewares/middlewarePagination';
import { businessHandles } from './handles';
import { middlewareIsLogged } from '../../middlewares/middlewareIsLogged';
import { middlewareUserCanCreateBusiness } from '../../middlewares/middlewareUserCanCreateBusiness';
import { middlewareBusinessManIsOwnerOfThis } from '../../middlewares/middlewareBusinessManIsOwnerOfThis';

export const router = Router();

/////////////////////////////////////////////////////////////////

router
  .route('/business')
  .get(middlewarePagination, businessHandles.get_business())
  .post(
    middlewareExpressValidator.body('name').notEmpty(),
    middlewareExpressValidator.body('postCategories').notEmpty(),
    middlewareExpressValidator.body('routeName').notEmpty(),
    middlewareExpressValidator.handle,
    middlewareIsLogged,
    middlewareUserCanCreateBusiness,
    businessHandles.post_business(),
  );

router.route('/business/summary').get(middlewarePagination, businessHandles.get_business_summary());
router.route('/business/search').get(businessHandles.get_business_search());

/////////////////////////////////////////////////////////////////

router
  .route('/business/:routeName')
  .get(
    middlewareExpressValidator.param('routeName').notEmpty(),
    middlewareExpressValidator.handle,
    businessHandles.get_business_routeName(),
  )
  .put(
    middlewareExpressValidator.param('routeName').notEmpty(),
    middlewareExpressValidator.handle,
    middlewareIsLogged,
    middlewareBusinessManIsOwnerOfThis,
    businessHandles.put_business_routeName(),
  );

////////////////////////////////////////////////////////
router
  .route('/business/:routeName/postCategories')
  .put(
    middlewareExpressValidator.param('routeName').notEmpty(),
    middlewareExpressValidator.body('postCategories').notEmpty(),
    middlewareExpressValidator.handle,
    middlewareIsLogged,
    middlewareUserCanCreateBusiness,
    middlewareBusinessManIsOwnerOfThis,
    businessHandles.update_business_post_categories(),
  );

router
  .route('/business/:routeName/sections')
  .post(
    middlewareExpressValidator.param('routeName').notEmpty(),
    middlewareExpressValidator.handle,
    middlewareIsLogged,
    middlewareBusinessManIsOwnerOfThis,
    businessHandles.post_business_routeName_sections(),
  );

router
  .route('/business/:routeName/sections/reorder')
  .put(
    middlewareExpressValidator.param('routeName').notEmpty(),
    middlewareExpressValidator.body('fromIndex').notEmpty(),
    middlewareExpressValidator.body('toIndex').notEmpty(),
    middlewareExpressValidator.handle,
    middlewareIsLogged,
    middlewareBusinessManIsOwnerOfThis,
    businessHandles.put_business_section_reorder(),
  );

router
  .route('/business/:routeName/sections/:sectionId')
  .put(
    middlewareExpressValidator.param('routeName').notEmpty(),
    middlewareExpressValidator.param('sectionId').notEmpty(),
    middlewareExpressValidator.handle,
    middlewareIsLogged,
    middlewareBusinessManIsOwnerOfThis,
    businessHandles.put_business_routeName_sections_sectionId(),
  )
  .delete(
    middlewareExpressValidator.param('routeName').notEmpty(),
    middlewareExpressValidator.param('sectionId').notEmpty(),
    middlewareExpressValidator.handle,
    middlewareIsLogged,
    middlewareBusinessManIsOwnerOfThis,
    businessHandles.del_business_routeName_sections_sectionId(),
  );

router
  .route('/business/:routeName/chatbotValidate')
  .post(
    middlewareExpressValidator.param('routeName').notEmpty(),
    middlewareExpressValidator.body('code').notEmpty(),
    middlewareExpressValidator.handle,
    middlewareIsLogged,
    middlewareBusinessManIsOwnerOfThis,
    businessHandles.post_business_routeName_chatbot_validate(),
  );

///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////

router
  .route('/business/:routeName/favoriteUsers')
  .post(
    middlewareExpressValidator.param('routeName').notEmpty(),
    middlewareExpressValidator.body('userId').notEmpty(),
    middlewareExpressValidator.handle,
    middlewareIsLogged,
    businessHandles.post_business_routeName_favorite_users(),
  )
  .delete(
    middlewareExpressValidator.param('routeName').notEmpty(),
    middlewareExpressValidator.body('userId').notEmpty(),
    middlewareExpressValidator.handle,
    middlewareIsLogged,
    businessHandles.del_business_routeName_favorite_users(),
  );

///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
router
  .route('/business/:routeName/checks')
  .put(
    middlewareExpressValidator.param('routeName').notEmpty(),
    middlewareExpressValidator.handle,
    middlewareIsLogged,
    businessHandles.put_business_routeName_checks(),
  );
