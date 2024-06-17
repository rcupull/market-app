//@ts-expect-error ignore types
import Agendash from 'agendash';
import { agenda } from './services';

export const agendashMiddleware = Agendash(agenda);
