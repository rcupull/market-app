import { Router } from 'express';

import { middlewarePagination } from '../../middlewares/middlewarePagination';
import { middlewareExpressValidator } from '../../middlewares/middlewareExpressValidator';
import { postHandles } from './handles';
import { middlewareIsLogged } from '../../middlewares/middlewareIsLogged';
import { middlewareUserCanCreateBusiness } from '../../middlewares/middlewareUserCanCreateBusiness';
import { middlewareBusinessManIsOwnerOfThis } from '../../middlewares/middlewareBusinessManIsOwnerOfThis';
import { middlewareIsUserThisPostOwner } from '../../middlewares/middlewareIsUserThisPostOwner';

export const router = Router();

router
  .route('/posts')
  .get(middlewarePagination, postHandles.get_posts())
  .post(
    middlewareExpressValidator.body('routeName').notEmpty(),
    middlewareExpressValidator.body('name').notEmpty(),
    middlewareExpressValidator.handle,
    middlewareIsLogged,
    middlewareUserCanCreateBusiness,
    middlewareBusinessManIsOwnerOfThis,
    postHandles.post_posts(),
  );

router
  .route('/posts/:postId/duplicate')
  .post(
    middlewareExpressValidator.param('postId').notEmpty(),
    middlewareExpressValidator.handle,
    middlewareIsLogged,
    middlewareUserCanCreateBusiness,
    middlewareIsUserThisPostOwner,
    postHandles.post_posts_postId_duplicate(),
  );
///////////////////////////////////////////////////////////////////////////

router
  .route('/posts/:postId')
  .get(
    middlewareExpressValidator.param('postId').notEmpty(),
    middlewareExpressValidator.handle,
    postHandles.get_posts_postId(),
  )
  .put(
    middlewareExpressValidator.param('postId').notEmpty(),
    middlewareExpressValidator.handle,
    middlewareIsLogged,
    middlewareIsUserThisPostOwner,
    postHandles.put_posts_postId(),
  )
  .delete(
    middlewareExpressValidator.param('postId').notEmpty(),
    middlewareExpressValidator.handle,
    middlewareIsLogged,
    middlewareIsUserThisPostOwner,
    postHandles.delete_posts_postId(),
  );

/////////////////////////////////////////////////////////////////
router
  .route('/posts/:postId/related')
  .get(
    middlewareExpressValidator.param('postId').notEmpty(),
    middlewareExpressValidator.handle,
    middlewarePagination,
    postHandles.get_related_posts(),
  );
/////////////////////////////////////////////////////////////////

router
  .route('/posts/bulkActions/delete')
  .delete(
    middlewareExpressValidator.body('routeName').notEmpty(),
    middlewareExpressValidator.handle,
    middlewareIsLogged,
    middlewareBusinessManIsOwnerOfThis,
    postHandles.bulk_action_delete(),
  );

router
  .route('/posts/bulkActions/update')
  .put(
    middlewareExpressValidator.body('routeName').notEmpty(),
    middlewareExpressValidator.body('update').notEmpty(),
    middlewareExpressValidator.handle,
    middlewareIsLogged,
    middlewareBusinessManIsOwnerOfThis,
    postHandles.bulk_action_update(),
  );
