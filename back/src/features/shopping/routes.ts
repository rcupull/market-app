import { Router } from 'express';
import { validators } from '../../middlewares/express-validator';
import { addPostToReq, isLogged, isUserThisBusinessOwner } from '../../middlewares/verify';

import { shoppingHandles } from './handles';
import { pagination } from '../../middlewares/pagination';

export const router = Router();

/////////////////////////////////////////////////////////////////

router
  .route('/shopping')
  .get(
    validators.query('routeName').notEmpty(),
    validators.handle,
    isLogged,
    pagination,
    shoppingHandles.get_shopping(),
  )
  .post(
    validators.body('postId').notEmpty(),
    validators.handle,
    isLogged,
    addPostToReq,
    shoppingHandles.post_shopping(),
  )
  .delete(
    validators.body('routeName').notEmpty(),
    validators.handle,
    isLogged,
    shoppingHandles.delete_shopping(),
  );

router
  .route('/shopping/owner')
  .get(
    validators.query('routeName').notEmpty(),
    validators.handle,
    isLogged,
    pagination,
    isUserThisBusinessOwner,
    shoppingHandles.get_shopping_owner(),
  );

router
  .route('/shopping/:shoppingId')
  .get(
    validators.param('shoppingId').notEmpty(),
    validators.handle,
    isLogged,
    shoppingHandles.get_shopping_shoppingId(),
  );

router
  .route('/shopping/:shoppingId/makeOrder')
  .post(
    validators.param('shoppingId').notEmpty(),
    validators.handle,
    isLogged,
    shoppingHandles.post_shopping_shoppingId_make_order(),
  );

router
  .route('/shopping/:shoppingId/changeState')
  .post(
    validators.param('shoppingId').notEmpty(),
    validators.body('state').notEmpty(),
    validators.handle,
    isLogged,
    shoppingHandles.post_shopping_shoppingId_change_state(),
  );
