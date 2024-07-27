import { useEffect, useState } from 'react';

import { Badge } from 'components/badge';
import { Button } from 'components/button';

import { useAuth } from 'features/api-slices/useAuth';

import { useDebouncer } from 'hooks/useDebouncer';

import { useBusiness } from 'pages/@hooks/useBusiness';
import { PostCategory } from 'types/business';
import { StyleProps } from 'types/general';
import { addStringToUniqueArray, cn, removeStringFromArray } from 'utils/general';

export interface PostCategoriesFilterButtonsProps extends StyleProps {
  onChange?: (values: Array<string> | undefined) => void;
  value?: Array<string>;
  postCategories?: Array<PostCategory>;
  excluding?: boolean;
  debounceDelay?: number;
  type?: 'wrapped' | 'scrollable';
  buttonType?: 'button' | 'tab';
}

export const PostCategoriesFilterButtons = ({
  onChange,
  className,
  value,
  postCategories,
  excluding,
  type,
  debounceDelay = 0,
  buttonType = 'button',
}: PostCategoriesFilterButtonsProps) => {
  const debouncer = useDebouncer();
  const [state, setState] = useState<Array<string>>();
  const { user } = useAuth();

  const { business } = useBusiness();

  const isMyBussiness = business?.createdBy === user?._id;

  useEffect(() => {
    setState(value);
  }, [JSON.stringify(value)]);

  if (!postCategories?.length) {
    if (isMyBussiness) {
      return (
        <div className="flex items-center">
          <Badge variant="warning" />
          <span className="ml-2 font-semibold">
            <span className="text-gray-500 pr-2">Admin:</span>
            Tiene seleccionado el filtro por catagorías pero no tiene categorías visibles en este
            negocio.
          </span>
        </div>
      );
    }

    /**
     * No mostrar nada cuando el usuario no es admin del negocio.
     */
    return <></>;
  }

  return (
    <div
      className={cn(
        'flex w-full gap-3 p-2',
        {
          'flex-wrap': type === 'wrapped',
          'overflow-x-auto max-w-full': type === 'scrollable',
        },
        className
      )}
    >
      {postCategories.map(({ label, tag }, index) => {
        const selected = state && state.includes(tag);

        return (
          <Button
            key={index}
            {...(buttonType === 'button' ? { variant: selected ? 'gray' : 'outlined' } : {})}
            {...(buttonType === 'tab' ? { variant: selected ? 'sublined' : 'transparent' } : {})}
            onClick={(e) => {
              e.preventDefault();

              const getNewState = () => {
                if (excluding) {
                  return selected ? [] : [tag];
                }

                return selected
                  ? removeStringFromArray(state, tag)
                  : addStringToUniqueArray(state || [], tag);
              };

              const newState = getNewState();
              setState(newState);
              debouncer(() => onChange?.(newState.length ? newState : undefined), debounceDelay);
            }}
            label={label}
          />
        );
      })}
    </div>
  );
};
