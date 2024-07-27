import { Badge } from 'components/badge';

import { ToastMessage } from 'types/toast';

export const renderToastMessage = (notification: ToastMessage) => {
  const { body, title } = notification;

  return (
    <div className="flex">
      <Badge variant="success" />

      <div className="ms-3">
        <h3 className="text-gray-800 font-semibold ">{title}</h3>
        <div className="text-sm text-gray-700 ">{body}</div>
      </div>
    </div>
  );
};
