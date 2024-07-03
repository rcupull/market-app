import { StepCommonProps } from '../../types';
import { ButtonNavContainer } from '../button-nav-container';

import SvgCheckCircleSolid from 'icons/CheckCircleSolid';

export interface PurchaseOrderSuccessProps extends StepCommonProps {}

export const PurchaseOrderSuccess = ({ finishButton }: PurchaseOrderSuccessProps) => {
  return (
    <>
      <div className="flex flex-col items-center">
        <SvgCheckCircleSolid className="size-16 fill-green-600" />

        <span className="mt-4 text-center">
          La orden de compra fue generada satisfactoriamente. El proveeedor fue notificado y se
          pondrá en contacto con usted para los detalles de la entrega.
        </span>
      </div>

      <ButtonNavContainer rightButton={finishButton} />
    </>
  );
};
