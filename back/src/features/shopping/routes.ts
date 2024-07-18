import { Router } from 'express';
import { middlewareExpressValidator } from '../../middlewares/middlewareExpressValidator';
import { addPostToReq, isLogged, isUserThisBusinessOwner } from '../../middlewares/verify';

import { shoppingHandles } from './handles';
import { middlewarePagination } from '../../middlewares/middlewarePagination';
import { sortPurshaseNotesMiddlware } from '../../middlewares/sortPurshaseNotes';

export const router = Router();

/////////////////////////////////////////////////////////////////

router
  .route('/shopping')
  .get(
    middlewareExpressValidator.query('routeName').notEmpty(),
    middlewareExpressValidator.handle,
    isLogged,
    middlewarePagination,
    shoppingHandles.get_shopping()
  )
  .post(
    middlewareExpressValidator.body('postId').notEmpty(),
    middlewareExpressValidator.handle,
    isLogged,
    addPostToReq,
    sortPurshaseNotesMiddlware,
    shoppingHandles.post_shopping()
  )
  .delete(
    middlewareExpressValidator.body('routeName').notEmpty(),
    middlewareExpressValidator.handle,
    isLogged,
    sortPurshaseNotesMiddlware,
    shoppingHandles.delete_shopping()
  );

router
  .route('/shopping/owner')
  .get(
    middlewareExpressValidator.query('routeName').notEmpty(),
    middlewareExpressValidator.handle,
    isLogged,
    middlewarePagination,
    isUserThisBusinessOwner,
    shoppingHandles.get_shopping_owner()
  );

router
  .route('/shopping/:shoppingId')
  .get(
    middlewareExpressValidator.param('shoppingId').notEmpty(),
    middlewareExpressValidator.handle,
    isLogged,
    shoppingHandles.get_shopping_shoppingId()
  );

router
  .route('/shopping/:shoppingId/makeOrder')
  .post(
    middlewareExpressValidator.param('shoppingId').notEmpty(),
    middlewareExpressValidator.handle,
    isLogged,
    shoppingHandles.post_shopping_shoppingId_make_order()
  );

router
  .route('/shopping/:shoppingId/changeState')
  .post(
    middlewareExpressValidator.param('shoppingId').notEmpty(),
    middlewareExpressValidator.body('state').notEmpty(),
    middlewareExpressValidator.handle,
    isLogged,
    shoppingHandles.post_shopping_shoppingId_change_state()
  );
