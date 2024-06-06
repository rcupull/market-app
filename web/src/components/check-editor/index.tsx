import { CKEditor } from '@ckeditor/ckeditor5-react';
import { useEffect, useRef } from 'react';

import { HtmlTextContainer } from 'components/html-text-container';

import { CheckEditorToolbarItem } from './types';
import { getImagesToRemove } from './utils';

import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { StyleProps } from 'types/general';

export interface CheckEditorUtils {
  getImageSrcToRemvove: (initialData: string | undefined) => Array<string>;
}
export interface CheckEditorProps extends StyleProps {
  onBlur?: (args: { event: any; editor: ClassicEditor; data: string }) => void;
  onFocus?: (args: { event: any; editor: ClassicEditor; data: string }) => void;
  onChange?: (args: { event: any; editor: ClassicEditor; data: string }) => void;
  onReady?: (editor: ClassicEditor) => void;
  value?: string;
  classNameContainer?: string;
  getUploadAdapter: (args: { loader: any }) => any;
  onChangeUtils?: (utils: CheckEditorUtils) => void;
}

export const CheckEditor = ({
  onBlur,
  onChange,
  onFocus,
  onReady,
  value,
  className,
  classNameContainer,
  getUploadAdapter,
  onChangeUtils,
}: CheckEditorProps) => {
  const addStylesToContainer = () => {
    const [element] = document.getElementsByClassName('ck-editor__editable_inline');

    if (!element) return;

    element.classList.add('overflow-auto');

    if (classNameContainer) {
      if (element) {
        classNameContainer.split(' ').forEach((className) => {
          element.classList.add(className);
        });
      }
    }
  };

  const refEditor = useRef<ClassicEditor>();

  useEffect(() => {
    onChangeUtils?.({
      getImageSrcToRemvove: (initialData) => {
        if (!refEditor.current) return [];

        return getImagesToRemove(refEditor.current, initialData);
      },
    });
  }, []);

  return (
    <HtmlTextContainer className={className}>
      <CKEditor
        editor={ClassicEditor}
        config={{
          toolbar: {
            items: [
              'undo',
              'redo',
              '|',
              'heading',
              '|',
              'bold',
              'italic',
              '|',
              'imageInsert',
              'link',
              'numberedList',
              'bulletedList',
            ] as Array<CheckEditorToolbarItem>,
            shouldNotGroupWhenFull: true,
          },
        }}
        data={value}
        onReady={(editor) => {
          /**
           * Add custom clases to container
           */
          addStylesToContainer();

          // getted from https://stackoverflow.com/questions/52873321/add-custom-headers-to-upload-image
          editor.plugins.get('FileRepository').createUploadAdapter = function (loader) {
            return getUploadAdapter({ loader });
          };

          onReady?.(editor);
        }}
        onChange={(event, editor) => {
          refEditor.current = editor;
          const data = editor.getData();
          onChange?.({ event, editor, data });
        }}
        onBlur={(event, editor) => {
          const data = editor.getData();
          onBlur?.({ event, editor, data });
        }}
        onFocus={(event, editor) => {
          const data = editor.getData();
          onFocus?.({ event, editor, data });
        }}
      />
    </HtmlTextContainer>
  );
};
