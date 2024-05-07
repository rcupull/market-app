import express from "express";
import { router } from "./router";
import cors from "cors";
import swaggerUiExpress from "swagger-ui-express";
import { passportMiddlewareInitialize } from "./middlewares/passport";
import { commaSeparateQuery } from "./middlewares/comma-separate-query";
import { frontMiddlware } from "./middlewares/frontMiddlware";
import { join } from "path";
import { appAssetsDir } from "./config";
const DOC = process.env.DOC;

export const app = express();

if (DOC === "true") {
  app.use(
    "/api-docs",
    swaggerUiExpress.serve,
    swaggerUiExpress.setup(require("../swagger_output.json"), {
      explorer: true,
    })
  );
}

app.use(cors({ origin: "*", optionsSuccessStatus: 200 }));

app.use(passportMiddlewareInitialize);

app.use(express.json());
app.use(commaSeparateQuery);
app.use(express.urlencoded({ extended: false }));
app.use("/api-services", router);
app.use((req, res, next) => {
  if (req.url.startsWith("/app-images")) {
    return express.static(join(process.cwd(), appAssetsDir))(req, res, next);
  }
  next();
});

/**
 * the frontMiddlware mmust be he last to use
 */
app.use(frontMiddlware);
