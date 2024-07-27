import { Capacitor } from '@capacitor/core';

export const usePlatform = (): {
  isNative: boolean;
  platformToggle: <T = any>(args: { native: T; web: T }) => T;
} => {
  const isNative = Capacitor.isNativePlatform();

  return {
    isNative,
    platformToggle: ({ native, web }) => (isNative ? native : web),
  };
};
