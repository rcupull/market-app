import { useEffect } from 'react';

import { useSimpleSlice } from 'features/slices/useSimpleSlice';

export const callAfarIds = {
  home_refresh_posts: 'home_refresh_posts',
  side_bar_redirect_to_last_created_business: 'side_bar_redirect_to_last_created_business',
  getAllUserBussiness: 'getAllUserBussiness',
  redirect_to_dashboard_business_routename: 'redirect_to_dashboard_business_routename',
  redirect_to_routename: 'redirect_to_routename',
  getAllAdminUsers: 'getAllAdminUsers',
};

export type CallAfarResources = string | Array<string>;

export const useCallFromAfar = (
  currentId?: CallAfarResources,
  callback?: (response?: any) => void,
): {
  onCallAfar: (callAfarResources?: CallAfarResources, response?: any) => void;
} => {
  const { data, setData } =
    useSimpleSlice<Array<{ id: CallAfarResources; response?: any }>>('useCallFromAfar');

  const removeCurrentId = () => setData(data.filter(({ id }) => id !== currentId));

  const currentData = currentId ? data.find(({ id }) => id === currentId) : undefined;

  useEffect(() => {
    if (currentData) {
      const { response } = currentData;
      callback?.(response);
      removeCurrentId();
    }
  }, [currentData, callback]);

  return {
    onCallAfar: (callAfarResources, response) => {
      if (!callAfarResources) return;

      if (callAfarResources instanceof Array) {
        return setData([...data, ...callAfarResources.map((id) => ({ id, response }))]);
      }

      return setData([...data, { id: callAfarResources, response }]);
    },
  };
};
