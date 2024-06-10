import { Query } from 'types/api';
import { getEndpoint, getEndpointUrl } from 'utils/api';
import { compact } from 'utils/general';

export const getCheckEditorUploadUrl = (extraQuery: Query = {}): string => {
  return getEndpoint({
    path: '/images-checkeditor',
    query: { endpoint: getEndpointUrl(), ...extraQuery },
  });
};

export const getImagesSrcFromValue = (data: string) => {
  const out = Array.from(
    new DOMParser().parseFromString(data, 'text/html').querySelectorAll('img'),
  ).map((img) => img.getAttribute('src'));

  return compact(out);
};

export const getImagesToRemove = (args: {
  newData: string;
  currentData?: string;
  exclude?: string;
}) => {
  const { newData, exclude = '', currentData = '' } = args;
  const out: Array<string> = [];
  const newSrcs = getImagesSrcFromValue(newData);
  const currentDataSrcs = getImagesSrcFromValue(currentData);
  const excludeSrcs = getImagesSrcFromValue(exclude);

  currentDataSrcs.forEach((src) => {
    if (newSrcs.includes(src)) return;
    if (excludeSrcs.includes(src)) return;

    out.push(src);
  });

  return out;
};
