import { Router } from "express";
import { validators } from "../../middlewares/express-validator";
import { pagination } from "../../middlewares/pagination";
import { businessHandles } from "./handles";
import {
  isLogged,
  isUserBusinessOwner,
  isUserThisBusinessOwner,
} from "../../middlewares/verify";

export const router = Router();

/////////////////////////////////////////////////////////////////

router
  .route("/business")
  .get(pagination, businessHandles.get_business())
  .post(isLogged, isUserBusinessOwner, businessHandles.post_business());

/////////////////////////////////////////////////////////////////

router
  .route("/business/:routeName")
  .get(
    validators.param("routeName").notEmpty(),
    validators.handle,
    businessHandles.get_business_routeName()
  )
  .put(
    validators.param("routeName").notEmpty(),
    validators.handle,
    isLogged,
    isUserBusinessOwner,
    isUserThisBusinessOwner,
    businessHandles.put_business_routeName()
  )
  .delete(
    validators.param("routeName").notEmpty(),
    validators.handle,
    isLogged,
    isUserBusinessOwner,
    isUserThisBusinessOwner,
    businessHandles.delete_business_routeName()
  );

////////////////////////////////////////////////////////
router
  .route("/business/:routeName/postCategories")
  .put(
    validators.param("routeName").notEmpty(),
    validators.body("postCategories").notEmpty(),
    validators.handle,
    isLogged,
    isUserBusinessOwner,
    isUserThisBusinessOwner,
    businessHandles.update_business_post_categories()
  );
