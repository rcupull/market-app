import { RequestHandler, Router } from 'express';
import { join } from 'path';
import { appFrontDir, hostname } from '../config';
import express from 'express';
import fs from 'fs';
import {
  get404Response,
  getBusinessNotFoundResponse,
  getPostNotFoundResponse,
} from '../utils/server-response';
import { logger } from '../features/logger';
import { combineMiddleware } from '../utils/general';
import { HtmlMeta } from '../types/general';

import { postServices } from '../features/post/services';
import { businessServicesFindOne } from '../features/business/services';

const defaultMeta: HtmlMeta = {
  title: 'Asere Market - Comercio para todos',
  description: 'Un proyecto B2B para desarrollar el comercio electrónico en Cuba.',
  url: 'http://www.aseremarket.net/',
  image: '/logo.png',
};

const injectMeta = (html: string, meta: HtmlMeta) => {
  const { description, image, title, url } = meta;

  return html
    .replace('__META_TW_TITLE__', title)
    .replace('__META_TW_DESCR__', description)
    .replace('__META_TW_IMAGE__', image)
    .replace('__META_TW_SITE__', url)
    .replace('__META_OG_TITLE__', title)
    .replace('__META_OG_DESCR__', description)
    .replace('__META_OG_IMAGE__', image)
    .replace('__META_OG_URL__', url)
    .replace('__META_DES__', description);
};

const injectMetaService: RequestHandler = (req, res, next) => {
  const { htmlMeta } = req;

  if (htmlMeta) {
    fs.readFile(join(process.cwd(), appFrontDir, 'index.html'), 'utf8', (err, htmlData) => {
      if (err) {
        logger.error('Error during file reading', err);

        return get404Response({
          res,
          json: { message: 'Html file not found' },
        });
      }
      res.send(injectMeta(htmlData, htmlMeta));
    });
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
    const business = await businessServicesFindOne({
      query: {
        routeName,
      },
    });

    if (!business) {
      return getBusinessNotFoundResponse({ res });
    }

    const getImageSrc = () => {
      const src = business.logo?.src;

      if (!src) {
        return defaultMeta.image;
      }

      return `${hostname}${business.logo?.src}`;
    };

    const getBusinessUrl = () => {
      return `${hostname}/b/${business.routeName}`;
    };

    req.htmlMeta = {
      description: 'Emprendimiento cubano la plataforma Asere Market', //TODO
      title: `${business.name}`,
      image: getImageSrc(),
      url: getBusinessUrl(),
    };
  }

  injectMetaService(req, res, next);
};

const injectPostMetaMiddlware: RequestHandler = async (req, res, next) => {
  const { params } = req;
  const { routeName, postId } = params;
  req.htmlMeta = defaultMeta;

  if (postId) {
    const post = await postServices.getOne({
      query: {
        _id: postId,
      },
    });

    if (!post) {
      return getPostNotFoundResponse({ res });
    }

    const getImageSrc = () => {
      const src = post.images?.[0]?.src;

      if (!src) {
        return defaultMeta.image;
      }

      return src.startsWith('http') ? src : `${hostname}${src}`;
    };

    const getPostUrl = () => {
      return `${hostname}/b/${routeName}/posts/${postId}`;
    };

    req.htmlMeta = {
      description: `${post.description}`,
      title: `${post.name}`,
      image: getImageSrc(),
      url: getPostUrl(),
    };
  }

  injectMetaService(req, res, next);
};

const router = Router();

export const frontMiddlware = combineMiddleware(
  router.get(/\/*(.png|.css|.js)/, express.static(join(process.cwd(), appFrontDir))),
  router.get('/b/:routeName/posts/:postId', injectPostMetaMiddlware),
  router.get('/b/:routeName*', injectBusinessMetaMiddlware),
  injectDefaultMetaMiddlware,
);
