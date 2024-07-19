import { Router } from 'express';
import { middlewareExpressValidator } from '../../middlewares/middlewareExpressValidator';

import { shoppingHandles } from './handles';
import { middlewarePagination } from '../../middlewares/middlewarePagination';
import { middlewareSortPurshaseNotes } from '../../middlewares/middlewareSortPurshaseNotes';
import { middlewareIsLogged } from '../../middlewares/middlewareIsLogged';
import { middlewareAddPostToReq } from '../../middlewares/middlewareAddPostToReq';
import { middlewareIsUserThisBusinessOwner } from '../../middlewares/middlewareIsUserThisBusinessOwner';

export const router = Router();

/////////////////////////////////////////////////////////////////

router
  .route('/shopping')
  .get(
    middlewareExpressValidator.query('routeName').notEmpty(),
    middlewareExpressValidator.handle,
    middlewareIsLogged,
    middlewarePagination,
    shoppingHandles.get_shopping(),
  )
  .post(
    middlewareExpressValidator.body('postId').notEmpty(),
    middlewareExpressValidator.handle,
    middlewareIsLogged,
    middlewareAddPostToReq,
    middlewareSortPurshaseNotes,
    shoppingHandles.post_shopping(),
  )
  .delete(
    middlewareExpressValidator.body('routeName').notEmpty(),
    middlewareExpressValidator.handle,
    middlewareIsLogged,
    middlewareSortPurshaseNotes,
    shoppingHandles.delete_shopping(),
  );

router
  .route('/shopping/owner')
  .get(
    middlewareExpressValidator.query('routeName').notEmpty(),
    middlewareExpressValidator.handle,
    middlewareIsLogged,
    middlewarePagination,
    middlewareIsUserThisBusinessOwner,
    shoppingHandles.get_shopping_owner(),
  );

router
  .route('/shopping/:shoppingId')
  .get(
    middlewareExpressValidator.param('shoppingId').notEmpty(),
    middlewareExpressValidator.handle,
    middlewareIsLogged,
    shoppingHandles.get_shopping_shoppingId(),
  );

router
  .route('/shopping/:shoppingId/makeOrder')
  .post(
    middlewareExpressValidator.param('shoppingId').notEmpty(),
    middlewareExpressValidator.handle,
    middlewareIsLogged,
    shoppingHandles.post_shopping_shoppingId_make_order(),
  );

router
  .route('/shopping/:shoppingId/changeState')
  .post(
    middlewareExpressValidator.param('shoppingId').notEmpty(),
    middlewareExpressValidator.body('state').notEmpty(),
    middlewareExpressValidator.handle,
    middlewareIsLogged,
    shoppingHandles.post_shopping_shoppingId_change_state(),
  );
