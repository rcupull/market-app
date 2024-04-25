import express from "express";
import { router } from "./router";
import cors from "cors";
import swaggerUiExpress from "swagger-ui-express";
import { passportMiddlewareInitialize } from "./middlewares/passport";
import { commaSeparateQuery } from "./middlewares/comma-separate-query";
import { appAssets, getAssetsDir } from "./config";
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

app.use((req, res, next) => {
  /**
   * app assets
   */
  const isAppAsset = appAssets
    .map((assets) => req.url.startsWith(assets))
    .some(Boolean);

  if (isAppAsset) {
    return express.static(getAssetsDir())(req, res, next);
  }

  next();
});

// app.use(expressSession);
app.use(passportMiddlewareInitialize);
// app.use(passportMiddleware.authenticate("session"));

app.use(express.json());
app.use(commaSeparateQuery);
app.use(express.urlencoded({ extended: false }));
app.use("/", router);
