import { sortPurshaseNotes } from '../features/shopping/utils';
import { RequestHandler } from '../types/general';

export const middlewareSortPurshaseNotes: RequestHandler = async (req, res, next) => {
  req.body.purshaseNotes = sortPurshaseNotes(req.body.purshaseNotes);
  next();
};
