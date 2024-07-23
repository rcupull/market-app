import { Button } from 'components/button';

import { useModal } from 'features/modal/useModal';

import { useRouter } from 'hooks/useRouter';

import { StepCommonProps } from '../../types';
import { ButtonNavContainer } from '../button-nav-container';

import SvgCheckCircleSolid from 'icons/CheckCircleSolid';
import { useBusiness } from 'pages/@hooks/useBusiness';
import { getOneBusinessRoute } from 'utils/business';

export interface PurchaseOrderSuccessProps extends StepCommonProps {}

export const PurchaseOrderSuccess = ({ nextBtnProps }: PurchaseOrderSuccessProps) => {
  const { onClose } = useModal();
  const { business } = useBusiness();
  const { pushRoute } = useRouter();

  return (
    <>
      <div className="flex flex-col items-center">
        <SvgCheckCircleSolid className="size-16 fill-green-600" />

        <span className="mt-4 text-center">
          La orden de compra fue generada satisfactoriamente. El proveeedor fue notificado y se
          pondrá en contacto con usted para los detalles de la entrega.
        </span>
      </div>

      <ButtonNavContainer
        rightButton={
          <Button
            {...nextBtnProps}
            label="Cerrar"
            onClick={() => {
              onClose();
              business && pushRoute(getOneBusinessRoute({ routeName: business.routeName }));
            }}
          />
        }
      />
    </>
  );
};
