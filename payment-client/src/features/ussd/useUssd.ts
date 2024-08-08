import { useSimpleSlice } from 'features/slices/useSimpleSlice';

import { usePlatform } from 'hooks/useCapacitor';
import { FetchOptions } from 'hooks/useFetch';

import { UssdManager } from '@veelit/capacitor-ussd-manager';
import { UssdResponse, UssdState } from 'types/ussd';

export const useUssd = () => {
  const { isNative } = usePlatform();

  const { data, setData } = useSimpleSlice<UssdState>('useUssd');

  return {
    ...data,
    onCallUssd: async (code: string, options?: FetchOptions<UssdResponse>): Promise<void> => {
      if (!isNative) return;

      try {
        setData((state) => ({ ...state, isBusy: true }));

        await UssdManager.requestUssdPermission();
        const response = await UssdManager.callUssd({ value: code });

        setData((state) => ({ ...state, isBusy: false }));
        options?.onAfterSuccess?.(response);
      } catch (error: any) {
        console.log('error', error);
        options?.onAfterFailed?.(error);
      }
    }
  };
};
