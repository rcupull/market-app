import express from "express";
import { router } from "./router";
import cors from "cors";
import swaggerUiExpress from "swagger-ui-express";
import { passportMiddlewareInitialize } from "./middlewares/passport";
import { commaSeparateQuery } from "./middlewares/comma-separate-query";
import { appAssetsDir, appFrontDir } from "./config";
import { join } from "path";
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
  const isAppAsset = ["/app-images"]
    .map((assets) => req.url.startsWith(assets))
    .some(Boolean);

  if (isAppAsset) {
    return express.static(join(process.cwd(), appAssetsDir))(req, res, next);
  }

  const isFrontFile = [".js", ".png", ".css"]
    .map((ext) => req.url.endsWith(ext))
    .some(Boolean);

  if (isFrontFile) {
    return express.static(join(process.cwd(), appFrontDir))(req, res, next);
  }

  if (req.url.startsWith("/api")) {
    return next();
  }

  res.sendFile(join(process.cwd(), appFrontDir, "index.html"));
});

app.use(passportMiddlewareInitialize);

app.use(express.json());
app.use(commaSeparateQuery);
app.use(express.urlencoded({ extended: false }));
app.use("/api-services", router);
