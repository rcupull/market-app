import { FieldCheckbox } from 'components/field-checkbox';
import { FiltersContainer } from 'components/filters-container';
import { RadioGroup } from 'components/radio-group';

import { getAllStatesQuery } from './utils';

import { useBusiness } from 'pages/@hooks/useBusiness';
import { GetAllShoppingQuery } from 'types/api';
import { StyleProps } from 'types/general';
import { ShoppingState } from 'types/shopping';
import { getDeliveryUtils } from 'utils/business';
import { cn } from 'utils/general';
import { getShoppingStateLabel } from 'utils/shopping';

type Value = ShoppingState | 'ALL';

export interface FiltersProps extends StyleProps {
  onChange?: (filters: Omit<GetAllShoppingQuery, 'routeName'>) => void;
  value?: Omit<GetAllShoppingQuery, 'routeName'>;
}

export const Filters = ({ onChange, value, className }: FiltersProps) => {
  const { business } = useBusiness();
  const getValue = (): Value => {
    return value?.states?.length === 1 ? value.states[0] : 'ALL';
  };

  const businessHasDelivery = getDeliveryUtils().getIsEnabled({
    deliveryConfig: business?.deliveryConfig
  });

  const handleChange = (state: Value) => {
    if (state === 'ALL') {
      return onChange?.({ page: 1, states: getAllStatesQuery({ businessHasDelivery }) });
    }
    onChange?.({ page: 1, states: [state] });
  };

  return (
    <FiltersContainer
      onReset={() => {
        onChange?.({ page: 1, states: [ShoppingState.REQUESTED] });
      }}
    >
      <RadioGroup<{ value: Value }>
        onChange={handleChange}
        value={getValue()}
        renderOption={({ checked, item }) => {
          const label = item.value === 'ALL' ? 'Todas' : getShoppingStateLabel(item.value);

          return <FieldCheckbox noUseFormik value={checked} label={label} />;
        }}
        optionToValue={({ value }) => value}
        items={[
          {
            value: 'ALL'
          },
          {
            value: ShoppingState.REQUESTED
          },
          {
            value: ShoppingState.APPROVED
          },
          {
            value: ShoppingState.PROCESSING
          },
          businessHasDelivery && {
            value: ShoppingState.READY_TO_DELIVERY
          },
          {
            value: ShoppingState.DELIVERED
          },
          {
            value: ShoppingState.REJECTED
          }
        ]}
        className={cn('flex items-center gap-4 mb-5 flex-wrap w-full', className)}
      />
    </FiltersContainer>
  );
};
