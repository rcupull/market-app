import type { BusinessNewProps } from './components/business-new';
import type { CatalogsSearchImageProps } from './components/catalogs-search-image';
import type { ConfirmationProps } from './components/confirmation';
import type { EmergentProps } from './components/emergent';
import type { ProfileUpdateProps } from './components/profile-update';

export type ModalId =
  | 'BusinessNew'
  | 'Confirmation'
  | 'ProfileUpdate'
  | 'CatalogsSearchImage'
  | 'Emergent';

export type ModalWindowProps<Id extends ModalId> = Id extends 'BusinessNew'
  ? BusinessNewProps
  : Id extends 'Confirmation'
    ? ConfirmationProps
    : Id extends 'ProfileUpdate'
      ? ProfileUpdateProps
      : Id extends 'CatalogsSearchImage'
        ? CatalogsSearchImageProps
        : Id extends 'Emergent'
          ? EmergentProps
          : undefined;

export interface ModalWindowOptions {
  timeout?: number;
  emergent?: boolean;
}
