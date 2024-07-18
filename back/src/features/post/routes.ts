import { Router } from 'express';

import { pagination } from '../../middlewares/pagination';
import { middlewareExpressValidator } from '../../middlewares/middlewareExpressValidator';
import { postHandles } from './handles';
import {
  isLogged,
  isUserBusinessOwner,
  isUserThisBusinessOwner,
  isUserThisPostOwner,
} from '../../middlewares/verify';

export const router = Router();

router
  .route('/posts')
  .get(pagination, postHandles.get_posts())
  .post(
    middlewareExpressValidator.body('routeName').notEmpty(),
    middlewareExpressValidator.body('name').notEmpty(),
    middlewareExpressValidator.handle,
    isLogged,
    isUserBusinessOwner,
    isUserThisBusinessOwner,
    postHandles.post_posts()
  );

router
  .route('/posts/:postId/duplicate')
  .post(
    middlewareExpressValidator.param('postId').notEmpty(),
    middlewareExpressValidator.handle,
    isLogged,
    isUserBusinessOwner,
    isUserThisPostOwner,
    postHandles.post_posts_postId_duplicate()
  );
///////////////////////////////////////////////////////////////////////////

router
  .route('/posts/:postId')
  .get(
    middlewareExpressValidator.param('postId').notEmpty(),
    middlewareExpressValidator.handle,
    postHandles.get_posts_postId()
  )
  .put(
    middlewareExpressValidator.param('postId').notEmpty(),
    middlewareExpressValidator.handle,
    isLogged,
    isUserThisPostOwner,
    postHandles.put_posts_postId()
  )
  .delete(
    middlewareExpressValidator.param('postId').notEmpty(),
    middlewareExpressValidator.handle,
    isLogged,
    isUserThisPostOwner,
    postHandles.delete_posts_postId()
  );

/////////////////////////////////////////////////////////////////
router
  .route('/posts/:postId/related')
  .get(
    middlewareExpressValidator.param('postId').notEmpty(),
    middlewareExpressValidator.handle,
    pagination,
    postHandles.get_related_posts()
  );
/////////////////////////////////////////////////////////////////

router
  .route('/posts/bulkActions/delete')
  .delete(
    middlewareExpressValidator.body('routeName').notEmpty(),
    middlewareExpressValidator.handle,
    isLogged,
    isUserThisBusinessOwner,
    postHandles.bulk_action_delete()
  );

router
  .route('/posts/bulkActions/update')
  .put(
    middlewareExpressValidator.body('routeName').notEmpty(),
    middlewareExpressValidator.body('update').notEmpty(),
    middlewareExpressValidator.handle,
    isLogged,
    isUserThisBusinessOwner,
    postHandles.bulk_action_update()
  );
