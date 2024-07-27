import type { CatalogsSearchImageProps } from './components/catalogs-search-image';
import type { ConfirmationProps } from './components/confirmation';
import type { EmergentProps } from './components/emergent';

export type ModalId = 'Confirmation' | 'CatalogsSearchImage' | 'Emergent';

export type ModalWindowProps<Id extends ModalId> = Id extends 'Confirmation'
  ? ConfirmationProps
  : Id extends 'CatalogsSearchImage'
    ? CatalogsSearchImageProps
    : Id extends 'Emergent'
      ? EmergentProps
      : undefined;

export interface ModalWindowOptions {
  timeout?: number;
  emergent?: boolean;
}
