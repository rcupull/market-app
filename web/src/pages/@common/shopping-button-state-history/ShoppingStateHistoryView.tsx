import { Divider } from 'components/divider';

import { ShoppingStateLabel } from '../shopping-state-label';

import { ShoppingState, ShoppingStateHistory } from 'types/shopping';
import { getDateString } from 'utils/date';

const renderState = ({
  state,
  lastUpdatedDate,
  current
}: {
  state: ShoppingState;
  lastUpdatedDate?: string;
  current?: boolean;
}) => {
  return (
    <div>
      <div className="p-2">
        <ShoppingStateLabel state={state} />

        {lastUpdatedDate && (
          <div className="text-gray-500 text-xs font-bold">
            {getDateString({ date: lastUpdatedDate, showTime: true })}
          </div>
        )}
        {current && (
          <div className="text-white font-bold text-sm bg-green-600 w-fit rounded-xl px-2 py-0.5">
            Estado actual
          </div>
        )}
      </div>
      <Divider narrow />
    </div>
  );
};

export interface ShoppingStateHistoryViewProps {
  state: ShoppingState;
  history: ShoppingStateHistory | undefined;
}

export const ShoppingStateHistoryView = ({
  state,
  history = []
}: ShoppingStateHistoryViewProps) => {
  return (
    <div className="flex flex-col-reverse">
      {history.map(({ lastUpdatedDate, state }) => {
        return renderState({ lastUpdatedDate, state });
      })}

      {renderState({ state, current: true })}
    </div>
  );
};

export default ShoppingStateHistoryView;
