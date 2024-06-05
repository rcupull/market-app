import { getEndpoint, getEndpointUrl } from 'utils/api';

export const getCheckEditorUploadUrl = (): string => {
  return getEndpoint({
    path: '/images-checkeditor',
    query: { endpoint: getEndpointUrl() },
  });
};
