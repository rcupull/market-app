import { StepCommonProps } from '../../types';
import { ButtonNavContainer } from '../button-nav-container';

export interface PurchaseOrderSuccessProps extends StepCommonProps {}

export const PurchaseOrderSuccess = ({ finishButton }: PurchaseOrderSuccessProps) => {
  return (
    <>
      <div>
        La orden de compra fue generada satisfactoriamente. El proveeedor ya fue notificado y se
        pondrá en contacto con usted para los detalles de la compra.
      </div>

      <ButtonNavContainer rightButton={finishButton} />
    </>
  );
};
