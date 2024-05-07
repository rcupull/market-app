import { RequestHandler, Router } from "express";
import { join } from "path";
import { appFrontDir, hostname } from "../config";
import express from "express";
import fs from "fs";
import { get404Response } from "../utils/server-response";
import { logger } from "../features/logger";
import { combineMiddleware } from "../utils/general";
import { HtmlMeta } from "../types/general";
import { businessServices } from "../features/business/services";
import { ServerResponse } from "http";

const defaultMeta: HtmlMeta = {
  title: "Asere Market - Comercio para todos",
  description:
    "Un proyecto B2B para desarrollar el comercio electrónico en Cuba.",
  url: "http://www.aseremarket.net/",
  image: "/logo.png",
};

const injectMeta = (html: string, meta: HtmlMeta) => {
  const { description, image, title, url } = meta;

  return html
    .replace("__META_TW_TITLE__", title)
    .replace("__META_TW_DESCR__", description)
    .replace("__META_TW_IMAGE__", image)
    .replace("__META_TW_SITE__", url)
    .replace("__META_OG_TITLE__", title)
    .replace("__META_OG_DESCR__", description)
    .replace("__META_OG_IMAGE__", image)
    .replace("__META_OG_URL__", url)
    .replace("__META_DES__", description);
};

const injectMetaService: RequestHandler = (req, res, next) => {
  const { htmlMeta } = req;

  if (htmlMeta) {
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
        res.send(injectMeta(htmlData, htmlMeta));
      }
    );
  } else {
    next();
  }
};

const injectDefaultMetaMiddlware: RequestHandler = (req, res, next) => {
  req.htmlMeta = defaultMeta;
  injectMetaService(req, res, next);
};

const injectBusinessMetaMiddlware: RequestHandler = async (req, res, next) => {
  const { params } = req;
  const { routeName } = params;
  req.htmlMeta = defaultMeta;

  if (routeName) {
    const business = await businessServices.findOne({
      res,
      req,
      query: {
        routeName,
      },
    });

    if (business instanceof ServerResponse) return business;

    req.htmlMeta = {
      description: "Emprendimiento cubano la plataforma Asere Market", //TODO
      title: `${business.name}`,
      image: business.logo?.src
        ? `${hostname}${business.logo?.src}`
        : defaultMeta.image,
      url: `${hostname}/${business.routeName}`,
    };
  }

  injectMetaService(req, res, next);
};

const router = Router();

export const frontMiddlware = combineMiddleware(
  router.get(
    /\/*(.png|.css|.js)/,
    express.static(join(process.cwd(), appFrontDir))
  ),
  (req, res, next) => {
    const noBusinessRoutes = [
      "/price",
      "/validate",
      "/forgot-password",
      "/dashboard",
      "/admin",
      "/about-us",
    ];

    const isNotBusinessRoute =
      noBusinessRoutes
        .map((noBusinessRoute) => req.url.startsWith(noBusinessRoute))
        .some(Boolean) || req.path === "/";

    if (isNotBusinessRoute) {
      injectDefaultMetaMiddlware(req, res, next);
    } else {
      router.get("/:routeName", injectBusinessMetaMiddlware);
    }
  }
);
