import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
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

export const getImagesToRemove = (editor: ClassicEditor, currentData: string | undefined) => {
  const out: Array<string> = [];
  if (currentData) {
    const editorImagesSrc = getImagesSrcFromValue(editor.getData());
    const currentImagesSrc = getImagesSrcFromValue(currentData);

    currentImagesSrc.forEach((src) => {
      if (!editorImagesSrc.includes(src)) {
        out.push(src);
      }
    });
  }

  return out;
};
