import { Router } from "express";

import { pagination } from "../../middlewares/pagination";
import { validators } from "../../middlewares/express-validator";
import { postHandles } from "./handles";
import {
  isLogged,
  isUserBusinessOwner,
  isUserThisBusinessOwner,
  isUserThisPostOwner,
} from "../../middlewares/verify";

export const router = Router();

router
  .route("/posts")
  .get(pagination, postHandles.get_posts())
  .post(
    validators.body("routeName").notEmpty(),
    validators.body("name").notEmpty(),
    validators.handle,
    isLogged,
    isUserBusinessOwner,
    isUserThisBusinessOwner,
    postHandles.post_posts()
  );

router
  .route("/posts/:postId/duplicate")
  .post(
    validators.param("postId").notEmpty(),
    validators.handle,
    isLogged,
    isUserBusinessOwner,
    isUserThisPostOwner,
    postHandles.post_posts_postId_duplicate()
  );
///////////////////////////////////////////////////////////////////////////

router
  .route("/posts/:postId")
  .get(
    validators.param("postId").notEmpty(),
    validators.handle,
    postHandles.get_posts_postId()
  )
  .put(
    validators.param("postId").notEmpty(),
    validators.handle,
    isLogged,
    isUserThisPostOwner,
    postHandles.put_posts_postId()
  )
  .delete(
    validators.param("postId").notEmpty(),
    validators.handle,
    isLogged,
    isUserThisPostOwner,
    postHandles.delete_posts_postId()
  );

/////////////////////////////////////////////////////////////////

router
  .route("/posts/bulkActions/delete")
  .delete(
    validators.body("routeName").notEmpty(),
    validators.handle,
    isLogged,
    isUserThisBusinessOwner,
    postHandles.bulk_action_delete()
  );

router
  .route("/posts/bulkActions/update")
  .put(
    validators.body("routeName").notEmpty(),
    validators.body("update").notEmpty(),
    validators.handle,
    isLogged,
    isUserThisBusinessOwner,
    postHandles.bulk_action_update()
  );
