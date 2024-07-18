import express from 'express';
import { router } from './router';
import cors from 'cors';
import swaggerUiExpress from 'swagger-ui-express';
import { passportMiddlewareInitialize } from './middlewares/middlewarePassport';
import { middlewareCommaSeparateQuery } from './middlewares/middlewareCommaSeparateQuery';
import { middlewareFront } from './middlewares/middlewareFront';
import { join } from 'path';
import { appAssetsDir } from './config';

export const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(
    '/api-docs',
    swaggerUiExpress.serve,
    //eslint-disable-next-line
    swaggerUiExpress.setup(require('../swagger_output.json'), {
      explorer: true,
    }),
  );
}

app.use(cors({ origin: '*', optionsSuccessStatus: 200 }));

app.use(passportMiddlewareInitialize);

app.use(express.json());
app.use(middlewareCommaSeparateQuery);
app.use(express.urlencoded({ extended: false }));

app.use('/api-services', router);
app.use((req, res, next) => {
  if (req.url.startsWith('/app-images')) {
    return express.static(join(process.cwd(), appAssetsDir))(req, res, next);
  }
  next();
});

/**
 * the middlewareFront mmust be he last to use
 */
app.use(middlewareFront);
