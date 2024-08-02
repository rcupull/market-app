import { ButtonClose } from 'components/button-close';
import { IconButton } from 'components/icon-button';

import { useModal } from 'features/modal/useModal';

import SvgHistorySolid from 'icons/HistorySolid';
import { StyleProps } from 'types/general';
import { Shopping } from 'types/shopping';
import { dynamic } from 'utils/makeLazy';

//eslint-disable-next-line
const ShoppingStateHistoryView = dynamic(() => import('./ShoppingStateHistoryView').then((m) => m));

export interface ShoppingButtonStateHistoryProps extends StyleProps {
  shopping: Shopping;
}

export const ShoppingButtonStateHistory = ({ shopping }: ShoppingButtonStateHistoryProps) => {
  const { pushModal } = useModal();

  const handleOpen = () => {
    const { state, history } = shopping;
    pushModal('Emergent', {
      useProps: () => {
        return {
          title: 'Historial de la orden de compra',
          content: <ShoppingStateHistoryView state={state} history={history} />,
          customBtn: <ButtonClose className="ml-auto" />,
          className: '!w-[30rem]',
        };
      },
    });
  };
  return (
    <IconButton
      title="Ver el historial de la orden de compra"
      stopPropagation
      svg={SvgHistorySolid}
      onClick={handleOpen}
    />
  );
};
