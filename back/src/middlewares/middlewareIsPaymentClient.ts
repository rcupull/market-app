import { RequestHandler } from 'express';

import { get401Response } from '../utils/server-response';
import { translateES } from '../utils/translate';

export const middlewareIsPaymentClient: RequestHandler = (req, res, next) => {
  const { user } = req;

  if (user?.role == 'paymentClient') return next();

  get401Response({
    res,
    json: { message: translateES['No tiene autorización para acceder a este servicio.'] }
  });
};
