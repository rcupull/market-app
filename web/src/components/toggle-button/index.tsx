import { Switch } from '@headlessui/react';
import { useEffect, useState } from 'react';

import { StyleProps } from 'types/general';
import { cn } from 'utils/general';

export interface ToggleButtonProps extends StyleProps {
  value?: boolean;
  onChange?: (value: boolean) => void;
  interaction?: 'onlyActivate' | 'onlyDeactivate' | 'both';
}

export const ToggleButton = ({
  className,
  value,
  onChange,
  interaction = 'both',
}: ToggleButtonProps) => {
  const [state, setState] = useState<boolean>(false);

  useEffect(() => {
    setState(!!value);
  }, [value]);

  const handleChange = (newValue: boolean) => {
    if (interaction === 'onlyActivate' && !newValue) return;
    if (interaction === 'onlyDeactivate' && newValue) return;

    setState(newValue);
    onChange?.(newValue);
  };

  return (
    <Switch
      checked={state}
      onChange={handleChange}
      className={cn(
        'bg-gray-200 relative inline-flex h-6 w-11 items-center rounded-full',
        {
          '!bg-blue-600': state,
        },
        className,
      )}
    >
      <span
        className={cn(
          'translate-x-1 inline-block h-4 w-4 transform rounded-full bg-white transition',
          {
            '!translate-x-6': state,
          },
        )}
      />
    </Switch>
  );
};
