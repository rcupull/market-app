import { Router } from "express";

import { catalogsHandles } from "./handles";

export const router = Router();

/////////////////////////////////////////////////////////////////

router.route("/catalogs/images").get(catalogsHandles.search_image());
