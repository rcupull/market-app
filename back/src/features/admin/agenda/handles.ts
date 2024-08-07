import { secretAgendaToken } from '../../../config';
import { RequestHandler } from '../../../types/general';
import { withTryCatch } from '../../../utils/error';
import { combineMiddleware } from '../../../utils/general';
import { get400Response } from '../../../utils/server-response';
import { translateES } from '../../../utils/translate';
import { agendashMiddleware } from '../../agenda/middlware';

const get_admin_agenda_token: () => RequestHandler = () => {
  return (req, res) => {
    withTryCatch(req, res, async () => {
      res.send({ agendaToken: secretAgendaToken });
    });
  };
};

const use_admin_agenda_web: () => RequestHandler = () =>
  combineMiddleware((req, res, next) => {
    const token = req.params.token;

    if (token === secretAgendaToken) {
      next();
    } else {
      return get400Response({ res, json: { message: translateES['Token inhexistente'] } });
    }
  }, agendashMiddleware);

export const adminAgendaHandles = {
  get_admin_agenda_token,
  use_admin_agenda_web
};
