import { Router } from 'express';
import { middlewareExpressValidator } from '../../middlewares/middlewareExpressValidator';
import { middlewarePagination } from '../../middlewares/middlewarePagination';
import { businessHandles } from './handles';
import { isLogged, isUserBusinessOwner, isUserThisBusinessOwner } from '../../middlewares/verify';

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
    isLogged,
    isUserBusinessOwner,
    businessHandles.post_business()
  );

router.route('/business/summary').get(middlewarePagination, businessHandles.get_business_summary());
router.route('/business/search').get(businessHandles.get_business_search());

/////////////////////////////////////////////////////////////////

router
  .route('/business/:routeName')
  .get(
    middlewareExpressValidator.param('routeName').notEmpty(),
    middlewareExpressValidator.handle,
    businessHandles.get_business_routeName()
  )
  .put(
    middlewareExpressValidator.param('routeName').notEmpty(),
    middlewareExpressValidator.handle,
    isLogged,
    isUserThisBusinessOwner,
    businessHandles.put_business_routeName()
  );

////////////////////////////////////////////////////////
router
  .route('/business/:routeName/postCategories')
  .put(
    middlewareExpressValidator.param('routeName').notEmpty(),
    middlewareExpressValidator.body('postCategories').notEmpty(),
    middlewareExpressValidator.handle,
    isLogged,
    isUserBusinessOwner,
    isUserThisBusinessOwner,
    businessHandles.update_business_post_categories()
  );

router
  .route('/business/:routeName/sections')
  .post(
    middlewareExpressValidator.param('routeName').notEmpty(),
    middlewareExpressValidator.handle,
    isLogged,
    isUserThisBusinessOwner,
    businessHandles.post_business_routeName_sections()
  );

router
  .route('/business/:routeName/sections/reorder')
  .put(
    middlewareExpressValidator.param('routeName').notEmpty(),
    middlewareExpressValidator.body('fromIndex').notEmpty(),
    middlewareExpressValidator.body('toIndex').notEmpty(),
    middlewareExpressValidator.handle,
    isLogged,
    isUserThisBusinessOwner,
    businessHandles.put_business_section_reorder()
  );

router
  .route('/business/:routeName/sections/:sectionId')
  .put(
    middlewareExpressValidator.param('routeName').notEmpty(),
    middlewareExpressValidator.param('sectionId').notEmpty(),
    middlewareExpressValidator.handle,
    isLogged,
    isUserThisBusinessOwner,
    businessHandles.put_business_routeName_sections_sectionId()
  )
  .delete(
    middlewareExpressValidator.param('routeName').notEmpty(),
    middlewareExpressValidator.param('sectionId').notEmpty(),
    middlewareExpressValidator.handle,
    isLogged,
    isUserThisBusinessOwner,
    businessHandles.del_business_routeName_sections_sectionId()
  );

router
  .route('/business/:routeName/chatbotValidate')
  .post(
    middlewareExpressValidator.param('routeName').notEmpty(),
    middlewareExpressValidator.body('code').notEmpty(),
    middlewareExpressValidator.handle,
    isLogged,
    isUserThisBusinessOwner,
    businessHandles.post_business_routeName_chatbot_validate()
  );
