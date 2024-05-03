import React, { useRef } from 'react';

export type EventKey =
  | 'Enter'
  | 'ArrowDown'
  | 'ArrowUp'
  | 'Escape'
  | 'Backspace'
  | 'Delete'
  | 'Control'
  | 'Tab'
  | ' ';

export const keyboardEventKeys: Record<EventKey, EventKey> = {
  ' ': ' ',
  ArrowDown: 'ArrowDown',
  ArrowUp: 'ArrowUp',
  Control: 'Control',
  Delete: 'Delete',
  Enter: 'Enter',
  Escape: 'Escape',
  Backspace: 'Backspace',
  Tab: 'Tab',
};

type Callback<T> = (event: React.KeyboardEvent<HTMLElement>, options: T) => void;

type Combinations<T> = Array<{
  keys: [EventKey, EventKey] | [EventKey, EventKey, EventKey];
  callback?: Callback<T>;
}>;

type Callbacks<T> = Partial<Record<EventKey | 'PreviousCallback', Callback<T>>> & {
  Combinations?: Combinations<T>;
};

export type UseKeyBoardReturn<T> = (options: T) => {
  onKeyDown: (event: React.KeyboardEvent<HTMLElement>) => void;
  onKeyUp: (event: React.KeyboardEvent<HTMLElement>) => void;
};

export const useKeyBoard = <T = void>(callbacks: Callbacks<T> = {}): UseKeyBoardReturn<T> => {
  const key1Pressed = useRef<boolean>(false);
  const key2Pressed = useRef<boolean>(false);

  const onKeyDown = (event: React.KeyboardEvent<HTMLElement>, options: T): void => {
    const key = event.key as EventKey;

    callbacks['PreviousCallback']?.(event, options);

    Object.values(keyboardEventKeys).includes(key) && callbacks[key]?.(event, options);

    callbacks['Combinations']?.forEach(({ keys, callback }) => {
      if (key === keys[0]) {
        key1Pressed.current = true;
      }
      if (key === keys[1] && key1Pressed.current) {
        if (keys.length === 2) {
          return callback?.(event, options);
        }
        key2Pressed.current = true;
      }
      if (key === keys[2] && key1Pressed.current && key2Pressed.current) {
        callback?.(event, options);
      }
    });
  };

  const onKeyUp = (event: React.KeyboardEvent<HTMLElement>): void => {
    const key = event.key as EventKey;

    callbacks['Combinations']?.forEach(({ keys }) => {
      if (key === keys[0]) {
        key1Pressed.current = false;
      }
      if (key === keys[1]) {
        key2Pressed.current = false;
      }
    });
  };

  return (options) => ({
    onKeyDown: (e) => onKeyDown(e, options),
    onKeyUp: (e) => onKeyUp(e),
  });
};
