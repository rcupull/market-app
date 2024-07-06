import { Router } from 'express';
import { validators } from '../../middlewares/express-validator';
import { pagination } from '../../middlewares/pagination';
import { businessHandles } from './handles';
import { isLogged, isUserBusinessOwner, isUserThisBusinessOwner } from '../../middlewares/verify';

export const router = Router();

/////////////////////////////////////////////////////////////////

router
  .route('/business')
  .get(pagination, businessHandles.get_business())
  .post(
    validators.body('name').notEmpty(),
    validators.body('categories').notEmpty(),
    validators.body('routeName').notEmpty(),
    validators.handle,
    isLogged,
    isUserBusinessOwner,
    businessHandles.post_business()
  );

router.route('/business/summary').get(pagination, businessHandles.get_business_summary());
router.route('/business/search').get(businessHandles.get_business_search());

/////////////////////////////////////////////////////////////////

router
  .route('/business/:routeName')
  .get(
    validators.param('routeName').notEmpty(),
    validators.handle,
    businessHandles.get_business_routeName()
  )
  .put(
    validators.param('routeName').notEmpty(),
    validators.handle,
    isLogged,
    isUserThisBusinessOwner,
    businessHandles.put_business_routeName()
  );

////////////////////////////////////////////////////////
router
  .route('/business/:routeName/postCategories')
  .put(
    validators.param('routeName').notEmpty(),
    validators.body('postCategories').notEmpty(),
    validators.handle,
    isLogged,
    isUserBusinessOwner,
    isUserThisBusinessOwner,
    businessHandles.update_business_post_categories()
  );

router
  .route('/business/:routeName/sections')
  .post(
    validators.param('routeName').notEmpty(),
    validators.handle,
    isLogged,
    isUserThisBusinessOwner,
    businessHandles.post_business_routeName_sections()
  );

router
  .route('/business/:routeName/sections/reorder')
  .put(
    validators.param('routeName').notEmpty(),
    validators.body('fromIndex').notEmpty(),
    validators.body('toIndex').notEmpty(),
    validators.handle,
    isLogged,
    isUserThisBusinessOwner,
    businessHandles.put_business_section_reorder()
  );

router
  .route('/business/:routeName/sections/:sectionId')
  .put(
    validators.param('routeName').notEmpty(),
    validators.param('sectionId').notEmpty(),
    validators.handle,
    isLogged,
    isUserThisBusinessOwner,
    businessHandles.put_business_routeName_sections_sectionId()
  )
  .delete(
    validators.param('routeName').notEmpty(),
    validators.param('sectionId').notEmpty(),
    validators.handle,
    isLogged,
    isUserThisBusinessOwner,
    businessHandles.del_business_routeName_sections_sectionId()
  );

router
  .route('/business/:routeName/chatbotValidate')
  .post(
    validators.param('routeName').notEmpty(),
    validators.body('code').notEmpty(),
    validators.handle,
    isLogged,
    isUserThisBusinessOwner,
    businessHandles.post_business_routeName_chatbot_validate()
  );
