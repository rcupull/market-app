import { RequestHandler } from "express";
import { join } from "path";
import { appAssetsDir, appFrontDir } from "../config";
import express from "express";
import fs from "fs";
import { get404Response } from "../utils/server-response";
import { logger } from "../features/logger";

interface HtmlMeta {
  title: string;
  description: string;
  url: string;
  image: string;
}
const defaultMeta: HtmlMeta = {
  title: "Asere Market - Comercio para todos",
  description:
    "Un proyecto B2B para desarrollar el comercio electrónico en Cuba.",
  url: "http://www.aseremarket.net/",
  image: "/logo.png",
};

export const returnMiddleware: RequestHandler = (req, res, next) => {
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

  fs.readFile(
    join(process.cwd(), appFrontDir, "index.html"),
    "utf8",
    (err, htmlData) => {
      if (err) {
        logger.error("Error during file reading", err);

        return get404Response({
          res,
          json: { message: "Html file not found" },
        });
      }

      let htmlOut = htmlData;

      htmlOut = htmlOut.replace("__META_TW_TITLE__", defaultMeta.title);
      htmlOut = htmlOut.replace("__META_TW_DESCR__", defaultMeta.description);
      htmlOut = htmlOut.replace("__META_TW_IMAGE__", defaultMeta.image);
      htmlOut = htmlOut.replace("__META_TW_SITE__", defaultMeta.url);
      htmlOut = htmlOut.replace("__META_OG_TITLE__", defaultMeta.title);
      htmlOut = htmlOut.replace("__META_OG_DESCR__", defaultMeta.description);
      htmlOut = htmlOut.replace("__META_OG_IMAGE__", defaultMeta.image);
      htmlOut = htmlOut.replace("__META_OG_URL__", defaultMeta.url);

      res.send(htmlOut);
    }
  );
};
