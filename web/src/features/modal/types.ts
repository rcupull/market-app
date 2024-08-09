import type { ConfirmationProps } from './components/confirmation';
import type { EmergentProps } from './components/emergent';

export type ModalId = 'Confirmation' | 'Emergent';

export type ModalWindowProps<Id extends ModalId> = Id extends 'Confirmation'
  ? ConfirmationProps
  : Id extends 'Emergent'
    ? EmergentProps
    : undefined;

export interface ModalWindowOptions {
  timeout?: number;
}
