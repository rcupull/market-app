import { useEffect, useState } from 'react';

import { Badge } from 'components/badge';
import { Button } from 'components/button';
import { ButtonRemove } from 'components/button-remove';
import { IconButtonShowHideProps } from 'components/icon-button-show-hide';

import { useUpdateManyBusiness } from 'features/api/business/useUpdateManyBusiness';
import { useModal } from 'features/modal/useModal';

import { FetchStatus, OnRefresh } from 'types/api';
import { Business } from 'types/business';
import { cn, isEmpty } from 'utils/general';

export interface HiddenBusinessControl {
  onGetHiddenButtonProp: (value: Business) => IconButtonShowHideProps;
  onGetHiddenTableRowStyles: (value: Business) => string;
  submitBtn: React.ReactNode;
  hasChange: boolean;
  onRefresh: OnRefresh;
}

export const useHiddenBusinessControl = ({
  onRefresh,
  fetchStatus,
}: {
  onRefresh: OnRefresh;
  fetchStatus: FetchStatus;
}): HiddenBusinessControl => {
  const [state, setState] = useState<Record<string, boolean>>({});
  const { pushModal } = useModal();
  const hasChange = !isEmpty(state);

  const { updateManyBussiness } = useUpdateManyBusiness();

  useEffect(() => {
    setState({});
  }, [fetchStatus.isSuccess]);

  const handleRefresh = () => {
    if (!hasChange) {
      return onRefresh();
    }

    pushModal('Confirmation', {
      useProps: () => {
        const { onClose } = useModal();

        return {
          className: 'max-w-lg',
          content:
            'Seguro que desea actualizar la tabla?. Serán perdidos todos los cambios hechos hasta el momento',
          badge: <Badge variant="error" />,
          primaryBtn: (
            <ButtonRemove
              label="Actualizar"
              onClick={() => {
                onRefresh();
                onClose();
              }}
            />
          ),
        };
      },
    });
  };

  const handleSubmitCall = () => {
    updateManyBussiness.fetch(
      Object.entries(state).map(([key, value]) => ({
        routeName: key,
        hidden: value,
      })),
      {
        onAfterSuccess: () => {
          onRefresh();
        },
      }
    );
  };

  const handleSubmit = () => {
    if (isEmpty(state)) return;

    const hasSomeToHide = Object.values(state).some((value) => value);

    if (!hasSomeToHide) {
      // if all are hidden, then we need to show without confirmation
      return handleSubmitCall();
    }

    // if some are to hide, then we need to show with confirmation
    pushModal('Confirmation', {
      useProps: () => {
        const { onClose } = useModal();

        return {
          className: 'max-w-lg',
          content:
            'Ocultar los negocios ocultará tambien las publicaciones de dichos negocios. ¿Seguro que desea ocultar?',
          badge: <Badge variant="error" />,
          primaryBtn: (
            <ButtonRemove
              label="Ocultar"
              onClick={() => {
                handleSubmitCall();
                onClose();
              }}
            />
          ),
        };
      },
    });
  };

  const isHidden = ({ hidden, routeName }: Business): boolean => {
    return state[routeName] !== undefined ? !!state[routeName] : !!hidden;
  };

  return {
    onRefresh: handleRefresh,
    submitBtn: hasChange && (
      <Button label="Guardar" onClick={handleSubmit} isBusy={updateManyBussiness.status.isBusy} />
    ),
    hasChange,
    onGetHiddenButtonProp: (value: Business) => {
      const { routeName, hidden } = value;

      return {
        hidden: isHidden(value),
        onClick: () => {
          const newState = { ...state };
          if (newState[routeName] === undefined) {
            newState[routeName] = !hidden;
          } else {
            delete newState[routeName];
          }

          setState(newState);
        },
      };
    },
    onGetHiddenTableRowStyles: (value: Business) => {
      return cn({
        'bg-gray-100 text-gray-400': isHidden(value),
      });
    },
  };
};
