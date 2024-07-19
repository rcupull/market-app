import { Request } from 'express';

export const getFieldInReqData = (req: Request, field: string) => {
  return req.body[field] || req.query[field] || req.params[field];
};
