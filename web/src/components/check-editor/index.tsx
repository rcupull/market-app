import { CKEditor } from '@ckeditor/ckeditor5-react';

import { HtmlTextContainer } from 'components/html-text-container';

import { CheckEditorToolbarItem } from './types';

import ClassicEditor from 'ckeditor5-build/build/ckeditor';
import { Nullable, StyleProps } from 'types/general';
import { compact } from 'utils/general';

export interface CheckEditorProps extends StyleProps {
  onBlur?: (args: { event: any; editor: ClassicEditor; data: string }) => void;
  onFocus?: (args: { event: any; editor: ClassicEditor; data: string }) => void;
  onChange?: (args: { event: any; editor: ClassicEditor; data: string }) => void;
  onReady?: (editor: ClassicEditor) => void;
  value?: string;
  getUploadAdapter?: (args: { loader: any }) => any;
}

export const CheckEditor = ({
  onBlur,
  onChange,
  onFocus,
  onReady,
  value,
  className,
  getUploadAdapter,
}: CheckEditorProps) => {
  const getItems = (): Array<CheckEditorToolbarItem> => {
    const out: Array<Nullable<CheckEditorToolbarItem>> = [
      'heading',
      '|',
      'bold',
      'italic',
      'link',
      '|',
      '|',
      'blockQuote',
      'insertTable',
      'mediaEmbed',
      'undo',
      'redo',
      'numberedList',
      'bulletedList',
      'outdent',
      'indent',
      getUploadAdapter && 'imageUpload',
      'highlight',
      'fontBackgroundColor',
      'fontFamily',
      'fontColor',
      'alignment',
    ];
    return compact(out);
  };

  return (
    <HtmlTextContainer className={className}>
      <CKEditor
        editor={ClassicEditor}
        config={{
          toolbar: {
            items: getItems(),
            shouldNotGroupWhenFull: true,
          },
        }}
        data={value}
        onReady={(editor) => {
          /**
           * Add custom clases to container
           */
          // addStylesToContainer();

          if (getUploadAdapter) {
            // getted from https://stackoverflow.com/questions/52873321/add-custom-headers-to-upload-image
            editor.plugins.get('FileRepository').createUploadAdapter = function (loader) {
              return getUploadAdapter({ loader });
            };
          }

          onReady?.(editor);
        }}
        onChange={(event, editor) => {
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
