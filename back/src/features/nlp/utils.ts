import { NlpTag } from './types';

export const nlpRecords: Record<NlpTag, Array<string>> = {
  'products.add': [
    'quiero agregar un producto',
    'como agregar un producto',
    'nuevo producto',
    'nuevo mercancia',
    'mercancia',
  ],
  'links.add': [
    'quiero agregar un enlace',
    'nuevo enlace',
    'enlace a otra pagina',
    'enlace a un negocio',
    'link a un negocio',
  ],
  'sections.add': [
    'agrupar enlaces',
    'agrupar productos',
    'grupos',
    'grupo de enlaces',
    'grupo de productos',
    'nueva seccion',
    'nuevo grupo',
  ],
};
